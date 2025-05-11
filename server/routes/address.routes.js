import express from "express";
import authUser from "../middlewares/authUser.js";
import { addAddress, getAddress } from "../controllers/address.controller.js";

const addressRouter = express.Router();

addressRouter.get('/get', authUser, getAddress);
addressRouter.post('/add', authUser, addAddress);

export default addressRouter;