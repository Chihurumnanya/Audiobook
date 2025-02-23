import { Request, Response } from "express";
import { User } from "../models/userModel";
import { verifyPassword, hashPassword } from "../config/bcrypt";
import { generateToken } from "../config/token";

// Login handler: Validates credentials, generates a token, and returns user data.
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone_number, password } = req.body;
    const user = await User.findOne({
      where: { phone_number, deleted: false },
    });
    if (!user) {
      res.status(404).json({ error: "User does not exist" });
      return;
    }
    const isValid = await verifyPassword(user.dataValues.password, password);
    if (!isValid) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }
    const token = generateToken(user.dataValues.id);
    res.status(200).json({ success: "Login successful", user, token });
    return;
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error while logging in", details: error.message });
    return
  }
};

// Signup handler: Creates a new user and returns a token.
export const signupUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone_number, password } = req.body;
    const existingUser = await User.findOne({
      where: { phone_number },
    });
    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
      return;
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      phone_number,
      password: hashedPassword,
      deleted: false,
    });
    const token = generateToken(newUser.dataValues.id);
    res.status(201).json({ success: "User created successfully", user: newUser, token });
    return;
  } catch (error: any) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error while registering", details: error.message });
    return;
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ success: "Logout successful" });
  return;
};
