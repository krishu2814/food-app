import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    // Enter user details in the body
    const { userName, email, password, phone, address } = req.body;

    if (!userName || !email || !password || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the fields (Required).",
      });
    }

    // 2. Check for existing user (THIS MUST BE DONE FIRST)
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(409).send({
        success: false,
        message: "User already exists with this Email. Please login.",
      });
    }

    // 3. Hash the password
    var saltPassword = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, saltPassword);

    // 4. Create a new user (Saving the HASHED password)
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    // 5. Success Response
    return res.status(201).send({
      success: true,
      message: "Successfully registered.",
      user,
    });
  } catch (error) {
    console.error(`Error in Register API: ${error}`);

    // Check for E11000 (Duplicate Key) error if the check in step 2 fails for any reason
    if (error.code === 11000) {
      return res.status(409).send({
        success: false,
        message: "Registration failed: This email is already registered.",
      });
    }

    // Default 500 response for all other server-side errors
    return res.status(500).send({
      success: false,
      message: `Error in Register API in authController`,
      error: error.message,
    });
  }
};

// 2). Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email or passsword",
      });
    }
    // Check user
    const user = await userModel.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }
    // compare Password -> encrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials -> Password(Hashed).",
      });
    }

    // Create Token after compare using bcrypt
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // user.password = undefined; -> to remove password field from the database -> MOdels

    // if user is present iun database
    return res.status(200).send({
      success: true,
      message: "Login Successfully Executed.",
      token,
      user, // send the user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API in authController.",
      error,
    });
  }
};

export { registerController, loginController };
