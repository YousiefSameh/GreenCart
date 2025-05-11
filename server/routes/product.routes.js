import express from "express";
import authSeller from "../middlewares/authSeller.js";
import { upload } from "../configs/multer.js";
import {
	addProduct,
	changeStock,
	getProducts,
	getProductsById,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductsById);
productRouter.post("/", upload.array("images"), authSeller, addProduct);
productRouter.put("/change-stock", authSeller, changeStock);

export default productRouter;
