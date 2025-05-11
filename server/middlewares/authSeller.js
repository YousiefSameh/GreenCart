import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
	const { sellerToken } = req.cookies;

	if (!sellerToken)
		return res.status(401).json({ success: false, message: "Not Authorized" });

	try {
		const { email } = jwt.verify(sellerToken, process.env.JWT_SECRET);
		if (email === process.env.SELLER_EMAIL) {
			req.email = email;
			next();
		} else {
			return res
				.status(401)
				.json({ success: false, message: "Not Authorized" });
		}
	} catch (error) {
		console.error("Auth middleware error:", error);
		res.status(401).json({ success: false, message: "Internal server error" });
	}
};

export default authSeller;
