import { z } from "zod";

const AddProductSchema = z
	.object({
		images: z
			.array(z.instanceof(File).optional())
			.max(4, "You can upload up to 4 images"),
		name: z.string().min(1, "Product name is required"),
		description: z.string().optional(),
		category: z.string().min(1, "Please select a category"),
		price: z
			.number({ invalid_type_error: "Price must be a number" })
			.min(0.01, "Price must be at least 0.01"),
		offerPrice: z
			.number({ invalid_type_error: "Offer price must be a number" })
			.min(0, "Offer price cannot be negative"),
	})
	.refine((data) => data.offerPrice <= data.price, {
		message: "Offer price must be less than or equal to Product Price",
		path: ["offerPrice"],
	});

type AddProductType = z.infer<typeof AddProductSchema>;

export { AddProductSchema, type AddProductType };
