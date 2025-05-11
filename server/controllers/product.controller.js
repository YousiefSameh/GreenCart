import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.models.js";

// Get Products : /api/products
export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.json({
			success: true,
			products,
			message: "Products Fetched Successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get Products By ID : /api/products/:id
export const getProductsById = async (req, res) => {
	try {
		const { id } = req.params;
		const products = await Product.find({ _id: id });
		res.json({
			success: true,
			products,
			message: "Products Fetched Successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Add Product : /api/products
export const addProduct = async (req, res) => {
	try {
		let productData = JSON.parse(req.body.productData);
		const images = req.files;
		let imagesUrl = await Promise.all(
			images.map(async (item) => {
				let result = await cloudinary.uploader.upload(item.path, {
					resource_type: "image",
				});
				return result.secure_url;
			})
		);
		const product = await Product.create({ ...productData, image: imagesUrl });
		res.json({ success: true, product, message: "Product Added Successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Change Product Stock Status : /api/products/change-stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Product Stock Changed Successfully" });
  } catch (error) {
    console.error(error);
		res.status(500).json({ success: false, message: error.message });
  }
};
