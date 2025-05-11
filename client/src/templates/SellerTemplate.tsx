import { useCallback, useEffect } from "react";
import { assets } from "@assets/assets";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actFetchProducts } from "@store/products/productsSlice";
import { actLogout } from "@store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const SellerTemplate = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { products } = useAppSelector((state) => state.products);
	const { loading } = useAppSelector((state) => state.user);

	const sidebarLinks = [
		{ name: "Products List", path: "/seller", icon: assets.product_list_icon },
		{ name: "Add Product", path: "/seller/add-product", icon: assets.add_icon },
		{
			name: "Track Orders",
			path: "/seller/track-orders",
			icon: assets.order_icon,
		},
	];

	useEffect(() => {
		if (products.length <= 0) {
			dispatch(actFetchProducts());
		}
	}, [dispatch, products]);

	const handleLogout = useCallback(async () => {
		const resultAction = await dispatch(actLogout("seller"));
		if (actLogout.fulfilled.match(resultAction)) {
			toast.success("Logged out successfully");
			navigate("/");
			scrollTo(0, 0);
		} else if (actLogout.rejected.match(resultAction)) {
			toast.error(resultAction.payload as string);
		}
	}, [dispatch, navigate]);

	return (
		<div className="flex min-h-screen">
			{/* Sidebar */}
			<div className="w-64 bg-white shadow-lg">
				<div className="p-4">
					<Link to="/" className="text-3xl font-bold text-primary">
						GreenCart
					</Link>
				</div>
				<nav className="mt-6">
					{sidebarLinks.map((link) => (
						<NavLink
							key={link.path}
							to={link.path}
							end={link.path === "/seller"}
							className={({ isActive }) =>
								`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
									isActive ? "bg-gray-100" : ""
								}`
							}
						>
							<img src={link.icon} alt="" className="w-5 h-5 mr-3" />
							{link.name}
						</NavLink>
					))}
					<button
						onClick={handleLogout}
						disabled={loading === "pending"}
						className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100"
					>
						<img
							src={assets.refresh_icon}
							className="w-5 h-5 mr-3 flex items-center justify-center"
						/>
						{loading === "pending" ? "Logging out..." : "Logout"}
					</button>
				</nav>
			</div>

			{/* Main Content */}
			<div className="flex-1 p-8 h-screen">
				<Outlet />
			</div>
			<ToastContainer position="top-center" />
		</div>
	);
};

export default SellerTemplate;
