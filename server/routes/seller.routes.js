import express from "express";
import { checkSellerAuth, sellerLogin, sellerLogout } from "../controllers/seller.controller.js";
import authSeller from "../middlewares/authSeller.js";

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/check-auth', authSeller, checkSellerAuth);
sellerRouter.get('/logout', authSeller, sellerLogout);

export default sellerRouter;