import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actLogout = createAsyncThunk(
	"user/logout",
	async (type: "user" | "seller", { rejectWithValue }) => {
		try {
			const endpoint =
				type === "user" ? "/api/user/logout" : "/api/seller/logout";
			const { data } = await axios.get(endpoint);

			if (data.success) {
				return type;
			} else {
				return rejectWithValue(data.message || "Logout failed");
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(axiosErrorHandler(error));
			}
			return rejectWithValue("Failed to logout");
		}
	}
);

export default actLogout;
