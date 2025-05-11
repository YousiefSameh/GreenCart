import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// Configs
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

// Routes
import userRouter from "./routes/user.routes.js";
import sellerRouter from "./routes/seller.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import addressRouter from "./routes/address.routes.js";
import orderRouter from "./routes/order.routes.js";
import { stripeWebhooks } from "./controllers/order.controller.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary()

// Allow Multiple Origins
const allowedOrigins = ['http://localhost:5173'];

app.post('/stripe', express.raw({ type: "application/json" }), stripeWebhooks);

// Middleware Configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter);
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})