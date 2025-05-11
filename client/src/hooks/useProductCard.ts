import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
	addToCart,
	cartItemChangeQuantity,
	cartItemRemove,
} from "@store/cart/cartSlice";
import { toast } from "react-toastify";

const useProductCard = () => {
  const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { items } = useAppSelector((state) => state.cart);
	const currency = import.meta.env.VITE_CURRENCY;

	const handleAddToCart = useCallback(
		(id: string) => {
			dispatch(addToCart(id));
			toast.success("Add To Cart Successfuly!");
		},
		[dispatch]
	);
	
	const handleDeteteProductFromCart = useCallback(
		(id: string, quantity: number) => {
			if (quantity > 0) {
				dispatch(cartItemChangeQuantity({ id, quantity }));
			} else {
				dispatch(cartItemRemove(id));
				toast.success("Removed From Cart Successfuly!");
			}
		},
		[dispatch]
	);
  return {
    navigate,
    items,
    currency,
    handleAddToCart,
    handleDeteteProductFromCart
  }
}

export default useProductCard