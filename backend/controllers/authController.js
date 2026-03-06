import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
  try {
    const { fullName, phone, email, password, company, isAgency } = req.body;
console.log(req.body);

   
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);


    await User.create({
      fullName,
      phone,
      email,
      password: hashedPassword,
      company,
      isAgency,
    });

    res.status(201).json({ message: "Account Created Successfully" });
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({ message: "Signup Failed", error });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid Credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid Credentials" });


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });


    res.cookie("token", token, {
      httpOnly: true, 
      secure: true, 
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.json({
      message: "Login Successful",
      user: {
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({ message: "Login Failed" });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.json({ message: "Logout Successful" });
};
