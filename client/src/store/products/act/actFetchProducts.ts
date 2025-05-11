import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

export const actFetchProducts = createAsyncThunk(
	"products/actFetchProducts",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get("/api/products");
			return data.products;
		} catch (error) {
			return rejectWithValue(axiosErrorHandler(error));
		}
	}
);