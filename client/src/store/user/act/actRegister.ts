import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios, { isAxiosError } from "axios";

interface RegisterCredentials {
	name: string;
	email: string;
	password: string;
}

interface RegisterResponse {
	success: boolean;
	user: {
		id: string;
		email: string;
		name: string;
	};
	message?: string;
}

const actRegister = createAsyncThunk(
	"user/register",
	async (credentials: RegisterCredentials, { rejectWithValue }) => {
		try {
			const { data } = await axios.post<RegisterResponse>(
				"/api/user/register",
				credentials
			);

			if (data.success) {
				return data.user;
			} else {
				return rejectWithValue(data.message || "Registration failed");
			}
		} catch (error) {
			if (isAxiosError(error)) {
				return rejectWithValue(axiosErrorHandler(error));
			}
			return rejectWithValue("Registration failed");
		}
	}
);

export default actRegister;
