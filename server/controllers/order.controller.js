import stripe from "stripe";
import Order from "../models/order.models.js";
import Product from "../models/product.models.js";

// Placed Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
	try {
		const { items, address } = req.body;
		const userId = req.userId;

		// Better validation
		if (!userId) {
			return res
				.status(400)
				.json({ success: false, message: "User ID is required" });
		}

		if (!address) {
			return res
				.status(400)
				.json({ success: false, message: "Address is required" });
		}

		if (!items || items.length === 0) {
			return res
				.status(400)
				.json({ success: false, message: "Items are required" });
		}

		// Calculate Amount Using Items - Fixed async calculation
		let amount = 0;
		for (const item of items) {
			const product = await Product.findById(item.product);
			if (!product) {
				return res.status(404).json({
					success: false,
					message: `Product not found: ${item.product}`,
				});
			}
			amount += Number(product.offerPrice) * item.quantity;
		}

		// Add Tax Charge (2%)
		amount += Math.floor(amount * 0.02);

		const newOrder = await Order.create({
			userId,
			items,
			amount,
			address,
			paymentType: "COD",
		});

		console.log("Order created successfully:", newOrder._id);
		return res.json({
			success: true,
			message: "Order Placed Successfully",
			orderId: newOrder._id,
		});
	} catch (err) {
		console.error("Error in placeOrderCOD:", err);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Placed Order Stripe : /api/order/stripe
export const placeOrderStripe = async (req, res) => {
	try {
		const { items, address } = req.body;
		const { origin } = req.headers;
		const userId = req.userId;
		const productsData = [];

		// Better validation
		if (!userId) {
			return res
				.status(400)
				.json({ success: false, message: "User ID is required" });
		}

		if (!address) {
			return res
				.status(400)
				.json({ success: false, message: "Address is required" });
		}

		if (!items || items.length === 0) {
			return res
				.status(400)
				.json({ success: false, message: "Items are required" });
		}

		// Calculate Amount Using Items - Fixed async calculation
		let amount = 0;
		for (const item of items) {
			const product = await Product.findById(item.product);
			if (!product) {
				return res.status(404).json({
					success: false,
					message: `Product not found: ${item.product}`,
				});
			}
			productsData.push({
				name: product.name,
				price: product.offerPrice,
				quantity: item.quantity,
			});
			amount += Number(product.offerPrice) * item.quantity;
		}

		// Add Tax Charge (2%)
		amount += Math.floor(amount * 0.02);

		const newOrder = await Order.create({
			userId,
			items,
			amount,
			address,
			paymentType: "Online",
		});

		// Stripe Gateway Initialize
		const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

		// Create Line Items For Stripe
		const line_items = productsData.map((item) => {
			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: item.name,
					},
					unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
				},
				quantity: item.quantity,
			};
		});

		// Create Session
		const session = await stripeInstance.checkout.sessions.create({
			line_items,
			mode: "payment",
			success_url: `${origin}/loader?next=my-orders`,
			cancel_url: `${origin}/cart`,
			metadata: {
				orderId: newOrder._id.toString(),
				userId,
			},
		});

		return res.json({
			success: true,
			url: session.url,
		});
	} catch (error) {
		console.error("Error in placeOrderStripe:", error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Stripe Webhooks to verify payment action : /stripe
export const stripeWebhooks = async (request, response) => {
	// Stripe Gateway Initialize
	const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
	const sig = request.headers["stripe-signature"];
	let event;

	try {
		event = stripeInstance.webhooks.constructEvent(
			request.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET
		)
	} catch (error) {
		return response.status(400).send(`Webhook Error: ${error.message}`);
	}

	// Handle The Event
	switch (event.type) {
		case "payment_intent.succeeded": {
			const paymentIntent = event.data.object;
			const paymentIntentId = paymentIntent.id;

			// Gettting Session Metadata
			const session = await stripeInstance.checkout.sessions.list({
				payment_intent: paymentIntentId
			});

			const { orderId, userId } = session.data[0].metadata;
			// Mark Payment as Paid
			await Order.findByIdAndUpdate(orderId, { isPaid: true });
			// Clear User Cart
			await User.findByIdAndUpdate(userId, { cartItems: {} });
			break;
		}
		case "payment_intent.payment_failed": {
			const paymentIntent = event.data.object;
			const paymentIntentId = paymentIntent.id;

			// Gettting Session Metadata
			const session = await stripeInstance.checkout.sessions.list({
				payment_intent: paymentIntentId
			});

			const { orderId } = session.data[0].metadata;

			await Order.findByIdAndDelete(orderId);
		}
	
		default:
			console.error(`Unhandled Event Type ${event.type}`);
			break;
	}
	response.json({ recieved: true });
}

// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res) => {
	try {
		const userId = req.userId;
		const orders = await Order.find({ userId })
			.populate("items.product address")
			.sort({ createdAt: -1 });

		res.json({ success: true, orders, message: "Getting Orders Successfully" });
	} catch (error) {
		console.error("Error in getUserOrders:", error);
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get All Orders (seller) : /api/order/seller
export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find({})
			.populate("items.product address")
			.sort({ createdAt: -1 });
		res.json({ success: true, orders, message: "Getting Orders Successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: error.message });
	}
};
