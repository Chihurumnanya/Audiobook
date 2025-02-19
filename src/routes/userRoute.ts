import { Router } from "express";
import { signupUser, loginUser, logoutUser } from "../services/userService";

export const userRouter = Router();

userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
