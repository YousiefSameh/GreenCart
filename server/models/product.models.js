import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: Array,
			requried: true,
		},
		price: {
			type: Number,
			requried: true,
		},
		offerPrice: {
			type: Number,
			requried: true,
		},
		image: {
			type: Array,
			requried: true,
		},
		category: {
			type: String,
			requried: true,
		},
		inStock: {
			type: Boolean,
			requried: true,
		},
	},
	{ timestamps: true }
);

const Product =
	mongoose.models.product || mongoose.model("product", productSchema);
export default Product;
