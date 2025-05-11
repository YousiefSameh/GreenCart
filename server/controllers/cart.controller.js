import User from "../models/user.models.js";

// Update User CartData : /api/cart/update
export const updateCart = async (req, res) => {
	try {
		const { cartItems } = req.body;
		const userId = req.userId; // Get userId from auth middleware

		const updatedUser = await User.findByIdAndUpdate(
			userId, 
			{ cartItems },
			{ new: true } // Return the updated document
		);

		if (!updatedUser) {
			return res.status(404).json({ 
				success: false, 
				message: "User not found" 
			});
		}

		res.json({ 
			success: true, 
			message: "Cart Updated Successfully",
			cartItems: updatedUser.cartItems 
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ success: false, message: error.message });
	}
};