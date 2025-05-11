import express from "express";
import { checkAuth, login, logout, register } from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/check-auth', authUser, checkAuth);
userRouter.get('/logout', authUser, logout);

export default userRouter;