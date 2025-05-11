import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import user from "./user/userSlice";
import products from "./products/productsSlice";
import cart from "./cart/cartSlice";
import search from "./search/searchSlice";

const cartPersistConfig = {
	key: "cart",
	storage,
	whitelist: ["items", "productsFullInfo"],
};

const userPersistConfig = {
	key: "user",
	storage,
	whitelist: ["user", "isAuthenticated", "state"],
};

const rootReducer = combineReducers({
	user: persistReducer(userPersistConfig, user),
	products,
	cart: persistReducer(cartPersistConfig, cart),
	search,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}),
});

// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
