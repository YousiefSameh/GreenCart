import jwt from "jsonwebtoken";

// Login Seller : /api/seller/login
export const sellerLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (
			password === process.env.SELLER_PASSWORD &&
			email === process.env.SELLER_EMAIL
		) {
			const sellerToken = jwt.sign({ email }, process.env.JWT_SECRET, {
				expiresIn: "7d",
			});
			res.cookie("sellerToken", sellerToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
				maxAge: 7 * 24 * 60 * 60 * 1000,
			});
			return res.json({
				success: true,
				message: "Seller Logged In Successfully",
			});
		} else {
			return res.json({ success: false, message: "Invalid Credentials" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Check Seller Auth : /api/seller/check-auth
export const checkSellerAuth = async (req, res) => {
	try {
		return res.json({
			success: true,
			message: "Seller checked successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Seller Logout : /api/seller/logout
export const sellerLogout = async (req, res) => {
	try {
		res.clearCookie("sellerToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
		});
		return res.json({
			success: true,
			message: "Seller Logged out Successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};
