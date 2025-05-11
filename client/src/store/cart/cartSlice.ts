import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customTypes/GeneralTypes";
import { IProduct } from "@customTypes/ProductsTypes";
import {
	getCartTotalPriceSelector,
	getCartTotalQuantitySelector,
} from "./selectors";
import { actCheckUserAuth } from "@store/user/userSlice";
import { isString } from "@customTypes/GuradsTypes";

interface CartState {
	items: { [key: string]: number };
	productsFullInfo: IProduct[];
	loading: TLoading;
	error: null | string;
}

const initialState: CartState = {
	items: {},
	productsFullInfo: [],
	loading: "idle",
	error: null,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const id = action.payload;
			if (state.items[id]) {
				state.items[id]++;
			} else {
				state.items[id] = 1;
			}
		},
		cartItemChangeQuantity: (state, action) => {
			state.items[action.payload.id] = action.payload.quantity;
		},
		cartItemRemove: (state, action) => {
			delete state.items[action.payload];
			// state.productsFullInfo = state.productsFullInfo.filter(
			// 	(el) => el._id !== action.payload
			// );
		},
		clearCartAfterPlaceOrder: (state) => {
			state.items = {};
			state.productsFullInfo = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(actCheckUserAuth.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(actCheckUserAuth.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.items = action.payload.cart?.items || {};
			state.error = null;
		});
		builder.addCase(actCheckUserAuth.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});
	},
});

export default cartSlice.reducer;
export const {
	addToCart,
	cartItemChangeQuantity,
	cartItemRemove,
	clearCartAfterPlaceOrder,
} = cartSlice.actions;
export { getCartTotalQuantitySelector, getCartTotalPriceSelector };
