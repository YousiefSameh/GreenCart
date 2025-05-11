import { z } from "zod";

const AddAddressSchema = z.object({
	_id: z.string().optional(),
	userId: z.string().optional(),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Please enter a valid email"),
	street: z.string().min(1, "Street address is required"),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State is required"),
	zipcode: z.string().min(1, "Zipcode is required"),
	country: z.string().min(1, "Country is required"),
	phone: z.string().min(1, "Phone number is required"),
});

type AddAddressType = z.infer<typeof AddAddressSchema>;

export { AddAddressSchema, type AddAddressType };
