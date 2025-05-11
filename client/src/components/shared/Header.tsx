import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { setShowUserLogin, actLogout } from "@store/user/userSlice";
import { assets } from "@assets/assets";
import { updateSearch } from "@store/search/searchSlice";
import { getCartTotalQuantitySelector } from "@store/cart/selectors";
import { toast } from "react-toastify";

const { logo, search_icon, nav_cart_icon, menu_icon, profile_icon } = assets;
const Header = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isAuthenticated } = useAppSelector(
		(state) => state.user
	);
	const { searchQuery } = useAppSelector((state) => state.search);
	const cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);
	const [open, setOpen] = useState(false);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateSearch(e.target.value));
	};

	const handleLogout = async () => {
		const resultAction = await dispatch(actLogout("user"));
		if (actLogout.fulfilled.match(resultAction)) {
			toast.success("Logged out successfully");
			navigate("/");
		} else if (actLogout.rejected.match(resultAction)) {
			toast.error(resultAction.payload as string);
		}
	};

	useEffect(() => {
		if (searchQuery.length > 0) {
			navigate("/products");
		}
	}, [navigate, searchQuery.length]);

	return (
		<nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
			<NavLink to="/" onClick={() => setOpen(false)}>
				<img className="h-9" src={logo} alt="Logo" />
			</NavLink>

			{/* Desktop Menu */}
			<div className="hidden sm:flex items-center gap-8">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/products">All Products</NavLink>
				<NavLink to="/contact">Contact</NavLink>

				<div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
					<input
						className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
						type="text"
						onChange={handleSearch}
						placeholder="Search products"
					/>
					<img className="w-4 h-4" src={search_icon} alt="Search Icon" />
				</div>

				<div
					className="relative cursor-pointer hidden md:block"
					onClick={() => navigate("/cart")}
				>
					<img className="w-6 opacity-80" src={nav_cart_icon} alt="Cart Icon" />
					<button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
						{cartTotalQuantity}
					</button>
				</div>

				{!isAuthenticated ? (
					<button
						onClick={() => dispatch(setShowUserLogin())}
						className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
					>
						Login
					</button>
				) : (
					<div className="relative group">
						<img src={profile_icon} alt="Profile Icon" className="w-10" />
						<ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
							<li
								onClick={() => navigate("/my-orders")}
								className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
							>
								My Orders
							</li>
							<li
								onClick={handleLogout}
								className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
							>
								Logout
							</li>
						</ul>
					</div>
				)}
			</div>

			{/* Mobile Menu */}
			<div className="flex items-center gap-6 md:hidden">
				<div
					className="relative cursor-pointer"
					onClick={() => navigate("/cart")}
				>
					<img className="w-6 opacity-80" src={nav_cart_icon} alt="Cart Icon" />
					<button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
						{cartTotalQuantity}
					</button>
				</div>
				<button
					onClick={() => (open ? setOpen(false) : setOpen(true))}
					aria-label="Menu"
				>
					<img className="w-6 opacity-80" src={menu_icon} alt="Menu Icon" />
				</button>
			</div>

			<div
				className={`${
					open ? "flex" : "hidden"
				} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-40`}
			>
				<NavLink to="/" className="block" onClick={() => setOpen(false)}>
					Home
				</NavLink>
				<NavLink
					to="/products"
					className="block"
					onClick={() => setOpen(false)}
				>
					All Products
				</NavLink>
				{isAuthenticated && (
					<NavLink
						to="/orders"
						className="block"
						onClick={() => setOpen(false)}
					>
						My Orders
					</NavLink>
				)}
				<NavLink to="/contact" className="block" onClick={() => setOpen(false)}>
					Contact
				</NavLink>
				{!isAuthenticated && (
					<button
						onClick={() => dispatch(setShowUserLogin())}
						className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
					>
						Login
					</button>
				)}
			</div>
		</nav>
	);
};

export default Header;
