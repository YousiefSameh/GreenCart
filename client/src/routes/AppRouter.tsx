import { lazy } from "react";
import ProtectedSellerRoute from "@components/feedback/ProtectedSellerRoute";
import SuspenseFallback from "@components/feedback/SuspenseFallback";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoadingPage } from "@components/feedback/Loading";

// Templates
const AppTemplate = lazy(() => import("@templates/AppTemplate"));
const SellerTemplate = lazy(() => import("@templates/SellerTemplate"));

// Pages
const Home = lazy(() => import("@pages/Home"));
const AllProducts = lazy(() => import("@pages/AllProducts"));
const CategoryProducts = lazy(() => import("@pages/CategoryProducts"));
const ProductDetails = lazy(() => import("@pages/ProductDetails"));
const Contact = lazy(() => import("@pages/Contact"));
const Cart = lazy(() => import("@pages/Cart"));
const AddAddress = lazy(() => import("@pages/AddAddress"));
const MyOrders = lazy(() => import("@pages/MyOrders"));
const SellerLogin = lazy(() => import("@components/forms/SellerLogin"));
const ProductsList = lazy(() => import("@pages/admin/ProductsList"));
const AddProduct = lazy(() => import("@pages/admin/AddProduct"));
const TrackOrders = lazy(() => import("@pages/admin/TrackOrders"));

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<AppTemplate />
		),
		children: [
			{
				index: true,
				element: (
					<SuspenseFallback>
						<Home />
					</SuspenseFallback>
				),
			},
			{
				path: "products",
				element: (
					<SuspenseFallback>
						<AllProducts />
					</SuspenseFallback>
				),
			},
			{
				path: "products/:category",
				element: (
					<SuspenseFallback>
						<CategoryProducts />
					</SuspenseFallback>
				),
			},
			{
				path: "products/:category/:id",
				element: (
					<SuspenseFallback>
						<ProductDetails />
					</SuspenseFallback>
				),
			},
			{
				path: "contact",
				element: (
					<SuspenseFallback>
						<Contact />
					</SuspenseFallback>
				),
			},
			{
				path: "cart",
				element: (
					<SuspenseFallback>
						<Cart />
					</SuspenseFallback>
				),
			},
			{
				path: "add-address",
				element: (
					<SuspenseFallback>
						<AddAddress />
					</SuspenseFallback>
				),
			},
			{
				path: "my-orders",
				element: (
					<SuspenseFallback>
						<MyOrders />
					</SuspenseFallback>
				),
			},
			{
				path: "loader",
				element: (
					<LoadingPage />
				),
			},
		],
	},
	{
		path: "login",
		element: <SellerLogin />,
	},
	{
		path: "seller",
		element: (
			<ProtectedSellerRoute>
				<SellerTemplate />
			</ProtectedSellerRoute>
		),
		children: [
			{
				index: true,
				element: (
					<ProtectedSellerRoute>
						<ProductsList />
					</ProtectedSellerRoute>
				),
			},
			{
				path: "add-product",
				element: (
					<ProtectedSellerRoute>
						<AddProduct />
					</ProtectedSellerRoute>
				),
			},
			{
				path: "track-orders",
				element: (
					<ProtectedSellerRoute>
						<TrackOrders />
					</ProtectedSellerRoute>
				),
			},
		],
	},
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
