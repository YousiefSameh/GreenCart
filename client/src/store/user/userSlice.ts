import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import actCheckUserState from "./act/actCheckSellerState";
import actCheckUserAuth from "./act/actCheckUserAuth";
import actLogin from "./act/actLogin";
import actRegister from "./act/actRegister";
import actLogout from "./act/actLogout";
import { TLoading } from "@customTypes/GeneralTypes";
import { isString } from "@customTypes";

interface UserState {
	user: {
		_id?: string;
		email?: string;
		name?: string;
	} | null;
	isAuthenticated: boolean;
	showUserLogin: boolean;
	loading: TLoading;
	error: null | string;
	state: "user" | "seller";
}

const initialState: UserState = {
	user: null,
	isAuthenticated: false,
	showUserLogin: false,
	loading: "idle",
	error: null,
	state: "user",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState["user"]>) => {
			state.user = action.payload;
			state.isAuthenticated = !!action.payload;
		},
		setShowUserLogin: (state) => {
			state.showUserLogin = !state.showUserLogin;
		},
		setSeller: (state, action: PayloadAction<"user" | "seller">) => {
			state.state = action.payload;
		},
	},
	extraReducers: (builder) => {
		// Check User Auth
		builder.addCase(actCheckUserAuth.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(actCheckUserAuth.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.user = action.payload.user || null;
			state.isAuthenticated = !!action.payload.user;
			state.error = null;
		});
		builder.addCase(actCheckUserAuth.rejected, (state, action) => {
			state.loading = "failed";
			state.user = null;
			state.isAuthenticated = false;
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});

		// Get User State (Seller)
		builder.addCase(actCheckUserState.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(actCheckUserState.fulfilled, (state, action) => {
			state.loading = "succeeded";
			if (action.payload === true) {
				state.state = "seller";
			} else {
				state.state = "user";
			}
		});
		builder.addCase(actCheckUserState.rejected, (state, action) => {
			state.loading = "failed";
			if (action.payload === true) {
				state.state = "seller";
			} else {
				state.state = "user";
			}
		});

		// Login
		builder.addCase(actLogin.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(actLogin.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.user = action.payload;
			state.isAuthenticated = true;
			state.error = null;
		});
		builder.addCase(actLogin.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});

		// Register
		builder.addCase(actRegister.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(actRegister.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.user = action.payload;
			state.isAuthenticated = true;
			state.error = null;
		});
		builder.addCase(actRegister.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});

		// Logout
		builder.addCase(actLogout.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(actLogout.fulfilled, (state) => {
			state.loading = "succeeded";
			state.user = null;
			state.isAuthenticated = false;
			state.state = "user";
			state.error = null;
		});
		builder.addCase(actLogout.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});
	},
});

export const { setUser, setShowUserLogin, setSeller } = userSlice.actions;
export {
	actCheckUserAuth,
	actCheckUserState,
	actLogin,
	actRegister,
	actLogout,
};
export default userSlice.reducer;
