import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

interface UserAuthResponse {
	success: boolean;
	user?: {
		id: string;
		email: string;
		name: string;
	};
	cart?: {
		items: { [key: string]: number };
	};
	message?: string;
}

const actCheckUserAuth = createAsyncThunk(
	"user/checkAuth",
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await axios.get<UserAuthResponse>(
				"/api/user/check-auth"
			);
			if (data.success) {
				return {
					user: data.user,
					cart: data.cart,
				};
			} else {
				return rejectWithValue(data.message || "Not authenticated");
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(axiosErrorHandler(error));
			}
			return rejectWithValue("Failed to check authentication");
		}
	}
);

export default actCheckUserAuth;
