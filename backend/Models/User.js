const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "User"], default: "Admin" },
});

// hash password using bcrypt before save it in DB [during registration]
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); 

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

User = new mongoose.model("User", userSchema);
module.exports = User;