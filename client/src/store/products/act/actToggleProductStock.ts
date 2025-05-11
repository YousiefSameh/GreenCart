import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios, { isAxiosError } from "axios";

const actToggleProductStock = createAsyncThunk(
	"products/toggleStock",
	async (
		{ productId, inStock }: { productId: string; inStock: boolean },
		{ rejectWithValue }
	) => {
		try {
			const { data } = await axios.put(`/api/products/change-stock`, {
        id: productId,
				inStock,
			});
			if (data.success) {
				return { productId, inStock };
			} else {
				return rejectWithValue(data.message);
			}
		} catch (error) {
			if (isAxiosError(error)) {
				return rejectWithValue(axiosErrorHandler(error));
			}
			return rejectWithValue("Failed to update product stock");
		}
	}
);

export default actToggleProductStock;
