import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized. Please login or register." });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (!id) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized. Please login or register." });
    }

    req.userId = id;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token. Please login again." });
  }
};

export default authUser;
