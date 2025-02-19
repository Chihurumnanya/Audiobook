import { Request, Response } from "express";
import { User } from "../models/userModel";
import { verifyPassword, hashPassword } from "../config/bcrypt";
import { generateToken } from "../config/token";

// Interfaces for incoming request data
interface LoginInput {
  phone_number: string;
  password: string;
}

interface SignupInput {
  name: string;
  email: string;
  phone_number: string;
  password: string;
}

// Login user: validates credentials and returns a JWT token on success.
export const loginUser = async (req: Request, res: Response) => {
  const userData = req.body as LoginInput;
  try {
    const user = await User.findOne({
      where: {
        phone_number: userData.phone_number,
        deleted: false,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }
    // Optionally check for verification here if needed.
    const isValid = await verifyPassword(user.dataValues.password, userData.password);
    if (!isValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    const token = generateToken(user.dataValues.id);
    return res.status(200).json({
      success: "Login successful",
      user,
      token,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({
      error: "Server error while logging in",
      details: error.message,
    });
  }
};

// Signup user: creates a new user record and returns a JWT token.
export const signupUser = async (req: Request, res: Response) => {
  const userData = req.body as SignupInput;
  try {
    const existingUser = await User.findOne({
      where: { phone_number: userData.phone_number },
    });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    const hashedPassword = await hashPassword(userData.password);
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
      deleted: false,
    });
    const token = generateToken(newUser.dataValues.id);
    return res.status(201).json({
      success: "User created successfully",
      user: newUser,
      token,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({
      error: "Server error while registering",
      details: error.message,
    });
  }
};

// Logout user: for JWT-based (stateless) authentication, logout is typically handled client-side.
export const logoutUser = async (req: Request, res: Response) => {
  return res.status(200).json({ success: "Logout successful" });
};
