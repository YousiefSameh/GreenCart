import { createSlice } from "@reduxjs/toolkit";
import { actFetchProducts } from "./act/actFetchProducts";
import { IProductState, isString } from "@customTypes";
import actAddProduct from "./act/actAddProduct";
import actToggleProductStock from "./act/actToggleProductStock";

const initialState: IProductState = {
	products: [],
	loading: "idle",
	error: null,
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(actFetchProducts.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(actFetchProducts.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.products = action.payload;
		});
		builder.addCase(actFetchProducts.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});
		builder.addCase(actAddProduct.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(actAddProduct.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.products.push(action.payload);
		});
		builder.addCase(actAddProduct.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});
		builder.addCase(actToggleProductStock.fulfilled, (state, action) => {
			const { productId, inStock } = action.payload;
			const product = state.products.find((p) => p._id === productId);
			if (product) {
				product.inStock = inStock;
			}
		});
	},
});

export default productsSlice.reducer;
export { actFetchProducts, actToggleProductStock };
