import { Outlet, useLocation } from "react-router-dom";
import Footer from "@components/shared/Footer";
import Header from "@components/shared/Header";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Login from "@components/forms/Login";
import { useEffect } from "react";
import { actFetchProducts } from "@store/products/productsSlice";
import { actCheckUserAuth, actCheckUserState } from "@store/user/userSlice";

const AppTemplate = () => {
	const isSellerPath = useLocation().pathname.includes("seller");
	const { products } = useAppSelector((state) => state.products);
	const { showUserLogin, loading } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		let mounted = true;

		const initializeApp = async () => {
			try {
				// Fetch products if needed
				if (products.length <= 0) {
					await dispatch(actFetchProducts());
				}

				// Check appropriate auth based on path
				if (mounted) {
					if (isSellerPath) {
						await dispatch(actCheckUserState());
					} else {
						await dispatch(actCheckUserAuth());
					}
				}
			} catch (error) {
				console.error("Initialization error:", error);
			}
		};

		initializeApp();

		return () => {
			mounted = false;
		};
	}, [dispatch, products.length, isSellerPath]);

	return (
		<>
			{!isSellerPath && <Header />}
			{showUserLogin && loading !== "pending" && <Login />}
			<main
				className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
			>
				<Outlet />
			</main>
			{!isSellerPath && <Footer />}
			<ToastContainer position="top-center" />
		</>
	);
};

export default AppTemplate;
