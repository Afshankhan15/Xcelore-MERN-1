const User = require("../Models/User"); // import usermodel from Models
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // npm install jsonwebtoken

const dotenv = require("dotenv"); // Import dotenv for environment variables

const { registerSchema, loginSchema } = require("../validators");
dotenv.config({ path: "../Config/config.env" });

const secret_key = process.env.JWT_SECRET; // Use environment variable for secret

exports.Register = async (req, res) => {
  try {
    // Validate request body
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    const { firstName, lastName, email, password, role } = req.body;
    const Existinguser = await User.findOne({ email });
    if (Existinguser) {
      return res.status(400).json({ msg: "User already registered" });
    } else {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        role,
      });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.Login = async (req, res) => {
  try {
    // Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    const { email, password } = req.body;
    const Existinguser = await User.findOne({ email });
    if (Existinguser) {
      const Matchtpswd = await bcrypt.compare(password, Existinguser.password);

      if (Matchtpswd) {
        const token = jwt.sign(
          {
            email: Existinguser.email,
            id: Existinguser._id,
            role: Existinguser.role,
          },
          secret_key,
          { expiresIn: "1h" }
        );
        res
          .status(200)
          .json({
            userToken: token,
            message: "User logged in successfully",
            role: Existinguser.role,
          });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(400).json({ message: "User not registered" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
