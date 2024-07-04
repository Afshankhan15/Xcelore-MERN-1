// backend/controllers/userController.js
const User = require("../Models/User");
const { registerSchema, updateSchema } = require("../validators");
exports.CreateUser = async (req, res) => {
  try {
    // Validate request body
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    const { firstName, lastName, email, password } = req.body;
    const Existinguser = await User.findOne({ email });
    if (Existinguser) {
      return res.status(400).json({ msg: "User already registered" });
    } else {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        role: "User", // role -> User
      });
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.GetUsers = async (req, res) => {
  try {
    const { search } = req.query;
    console.log("search:", search);

    let query = { role: "User" }; // Filter to get only users with role 'User'

    if (search) {
      const searchRegex = new RegExp(search, "i"); // 'i' for case insensitive
      query = {
        ...query,
        $or: [
          { firstName: searchRegex },
          { lastName: searchRegex },
          { email: searchRegex },
        ],
      };
    }

    const users = await User.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.UpdateUser = async (req, res) => {
  try {
    // Validate request body
    const { error } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
