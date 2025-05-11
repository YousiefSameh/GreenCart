import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios, { isAxiosError } from "axios";

interface LoginCredentials {
	email: string;
	password: string;
}

interface LoginResponse {
	success: boolean;
	user: {
		id: string;
		email: string;
		name: string;
	};
	message?: string;
}

const actLogin = createAsyncThunk(
	"user/login",
	async (credentials: LoginCredentials, { rejectWithValue }) => {
		try {
			const { data } = await axios.post<LoginResponse>(
				"/api/user/login",
				credentials
			);

			if (data.success) {
				return data.user;
			} else {
				return rejectWithValue(data.message || "Login failed");
			}
		} catch (error) {
			if (isAxiosError(error)) {
				return rejectWithValue(axiosErrorHandler(error));
			}
			return rejectWithValue("Login failed");
		}
	}
);

export default actLogin;
