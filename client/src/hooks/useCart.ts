import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useNavigate } from "react-router-dom";
import { IProduct } from "@customTypes/ProductsTypes";
import {
	getCartTotalPriceSelector,
	getCartTotalQuantitySelector,
} from "@store/cart/selectors";
import axios from "axios";
import { toast } from "react-toastify";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { AddAddressType } from "@validations/AddAddressSchema";
import { clearCartAfterPlaceOrder } from "@store/cart/cartSlice";

const useCart = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { products } = useAppSelector((state) => state.products);
	const { user } = useAppSelector((state) => state.user);
	const cartItems = useAppSelector((state) => state.cart.items);
	const totalPrice = useAppSelector(getCartTotalPriceSelector);
	const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
	const [cartArray, setCartArray] = useState<IProduct[]>([]);
	const [showAddress, setShowAddress] = useState(false);
	const [addresses, setAddresses] = useState([]);
	const [selectedAddress, setSelectedAddress] = useState<AddAddressType | null>(null);
	const [paymentOption, setPaymentOption] = useState("COD");

	const currency = import.meta.env.VITE_CURRENCY;

	const fetchAddresses = async () => {
		try {
			const { data } = await axios.get("/api/address/get");
			if (data.success) {
				setAddresses(data.addresses);
				if (data.addresses.length > 0) {
					setSelectedAddress(data.addresses[0])
				}
			}
		} catch (error) {
			toast.error(axiosErrorHandler(error));
		}
	};

	// Effect to sync cart items to backend whenever they change
	useEffect(() => {
		const syncCartToBackend = async () => {
			try {
				const { data } = await axios.post("/api/cart/update", {
					cartItems,
				});

				if (!data.success) {
					console.error("Failed to sync cart to backend:", data.message);
					return;
				}

				// Verify the update by checking returned cartItems
				if (JSON.stringify(data.cartItems) !== JSON.stringify(cartItems)) {
					console.error(
						"Cart sync verification failed: backend cart doesn't match frontend cart"
					);
				}
			} catch (error) {
				console.error(
					"Error syncing cart to backend:",
					axiosErrorHandler(error)
				);
			}
		};
		if (user) {
			fetchAddresses();
		}
		// Only sync if cart is not empty and user is authenticated
		if (Object.keys(cartItems).length > 0) {
			syncCartToBackend();
		}
	}, [cartItems, user]);

	useEffect(() => {
		const getCartProducts = () => {
			const tempArray = [];
			if (Object.entries(cartItems).length > 0) {
				for (const key in cartItems) {
					const product = products.find((product) => product._id === key);
					if (product) {
						const updatedProduct = { ...product, quantity: cartItems[key] };
						tempArray.push(updatedProduct);
					}
					setCartArray(tempArray);
				}
			} else {
				setCartArray([]);
			}
		};

		if (products.length > 0 && cartItems) {
			getCartProducts();
		}
	}, [cartItems, products, products.length]);

	const placeOrder = useCallback(async () => {
		try {
			if (!selectedAddress) {
				toast.info("Please select a delivery address");
				return;
			}

			if (cartArray.length === 0) {
				toast.info("Your cart is empty");
				return;
			}

			// Place Order With COD
			if (paymentOption === "COD") {
				const { data } = await axios.post('/api/order/cod', {
					userId: user?._id,
					items: cartArray.map((item) => ({ product: item._id, quantity: item.quantity })),
					address: selectedAddress._id
				});
				if (data.success) {
					toast.success(data.message);
					dispatch(clearCartAfterPlaceOrder());
					navigate('/my-orders');
				} else {
					toast.error(data.message);
				}
			}
			// Place Order With Stripe
			else {
				const { data } = await axios.post('/api/order/stripe', {
					userId: user?._id,
					items: cartArray.map((item) => ({ product: item._id, quantity: item.quantity })),
					address: selectedAddress._id
				});
				if (data.success) {
					window.location.replace(data.url);
				} else {
					toast.error(data.message);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}, [cartArray, dispatch, navigate, paymentOption, selectedAddress, user?._id]);

	return {
		navigate,
		dispatch,
		products,
		cartItems,
		totalPrice,
		totalQuantity,
		cartArray,
		showAddress,
		setShowAddress,
		addresses,
		setAddresses,
		selectedAddress,
		setSelectedAddress,
		paymentOption,
		setPaymentOption,
		currency,
		placeOrder,
	};
};

export default useCart;
