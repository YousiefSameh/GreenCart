import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setSeller } from "@store/user/userSlice";
import { LoginSchema, LoginType } from "@validations/LoginSchema";
import axios from "axios";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import actGetUserState from "@store/user/act/actCheckSellerState";

const SellerLogin = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { state } = useAppSelector((state) => state.user);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let mounted = true;

		const initializeApp = async () => {
			if (mounted) {
				await dispatch(actGetUserState());
			}
		};

		initializeApp();

		return () => {
			mounted = false;
		};
	}, [dispatch]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginType>({
		mode: "onBlur",
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (info: LoginType) => {
		setIsLoading(true);
		try {
			const { data } = await axios.post("/api/seller/login", info);
			if (data.success) {
				dispatch(setSeller("seller"));
				navigate("/seller");
			} else {
				toast.error(data.message || "Invalid credentials");
				console.log("err")
			}
		} catch (error) {
			if (isAxiosError(error) && error.response?.data?.message) {
				toast.error(error.response.data.message);
			} else {
				toast.error("An error occurred during login");
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (state === "seller") {
			navigate("/seller");
		}
	}, [navigate, state]);

	return (
		state !== "seller" && (
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="min-h-screen flex items-center text-sm text-gray-600"
			>
				<div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
					<p className="text-2xl font-medium m-auto">
						<span className="text-primary">Seller</span> Login
					</p>
					<div className="w-full">
						<p>Email</p>
						<input
							type="text"
							{...register("email")}
							placeholder="Enter Email Here..."
							className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
							disabled={isLoading}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email.message}
							</p>
						)}
					</div>
					<div className="w-full">
						<p>Password</p>
						<input
							type="password"
							{...register("password")}
							placeholder="Enter Password Here..."
							className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
							disabled={isLoading}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password.message}
							</p>
						)}
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className="bg-primary text-white w-full py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? (
							<div className="flex items-center justify-center">
								<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
							</div>
						) : (
							"Login"
						)}
					</button>
				</div>
				<ToastContainer position="top-center" />
			</form>
		)
	);
};

export default SellerLogin;
