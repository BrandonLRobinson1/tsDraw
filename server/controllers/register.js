const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required." });

    const duplicate = await User.findOne({ email: email.toLowerCase() }).exec();

    if (duplicate)
      return res.status(409).json({ message: "This email is being used" });

    const hashedPwd = await bcrypt.hash(password, 10);

    const result = await User.create({
      email: email.toLowerCase(),
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${email} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = register;
