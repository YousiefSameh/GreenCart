import useLogin from "@hooks/useLogin";
import { setShowUserLogin } from "@store/user/userSlice";

const Login = () => {
	const {
		dispatch,
		state,
		loading,
		registerLogin,
		handleSubmitLogin,
		loginErrors,
		registerSignUp,
		handleSubmitRegister,
		registerErrors,
		onSubmitLogin,
		onSubmitRegister,
		switchForm,
	} = useLogin();

	return (
		<div className="w-screen h-screen bg-black/50 fixed flex items-center justify-center flex-col inset-0 z-50">
			<form
				className="flex flex-col gap-4 m-auto items-start p-8 w-80 sm:w-[500px] rounded-lg shadow-xl border border-gray-200 bg-white relative"
				onSubmit={
					state === "login"
						? handleSubmitLogin(onSubmitLogin)
						: handleSubmitRegister(onSubmitRegister)
				}
			>
				<button
					type="button"
					className="absolute top-4 right-6 cursor-pointer"
					onClick={() => dispatch(setShowUserLogin())}
					disabled={loading === "pending"}
				>
					X
				</button>
				<p className="text-2xl font-medium m-auto">
					<span className="text-primary">User</span>{" "}
					{state === "login" ? "Login" : "Sign Up"}
				</p>

				{state === "register" && (
					<div className="w-full">
						<p>Name</p>
						<input
							{...registerSignUp("name")}
							placeholder="Type your name"
							className={`border ${
								registerErrors.name ? "border-red-500" : "border-gray-200"
							} rounded w-full p-2 mt-1 outline-primary`}
							type="text"
							disabled={loading === "pending"}
						/>
						{registerErrors.name && (
							<p className="text-red-500 text-sm mt-1">
								{registerErrors.name.message}
							</p>
						)}
					</div>
				)}

				<div className="w-full">
					<p>Email</p>
					<input
						{...(state === "login"
							? registerLogin("email")
							: registerSignUp("email"))}
						placeholder="Type your email"
						className={`border ${
							state === "login"
								? loginErrors.email
								: registerErrors.email
								? "border-red-500"
								: "border-gray-200"
						} rounded w-full p-2 mt-1 outline-primary`}
						type="email"
						disabled={loading === "pending"}
					/>
					{state === "login"
						? loginErrors.email && (
								<p className="text-red-500 text-sm mt-1">
									{loginErrors.email.message}
								</p>
						  )
						: registerErrors.email && (
								<p className="text-red-500 text-sm mt-1">
									{registerErrors.email.message}
								</p>
						  )}
				</div>

				<div className="w-full">
					<p>Password</p>
					<input
						{...(state === "login"
							? registerLogin("password")
							: registerSignUp("password"))}
						placeholder="Type your password"
						className={`border ${
							state === "login"
								? loginErrors.password
								: registerErrors.password
								? "border-red-500"
								: "border-gray-200"
						} rounded w-full p-2 mt-1 outline-primary`}
						type="password"
						disabled={loading === "pending"}
					/>
					{state === "login"
						? loginErrors.password && (
								<p className="text-red-500 text-sm mt-1">
									{loginErrors.password.message}
								</p>
						  )
						: registerErrors.password && (
								<p className="text-red-500 text-sm mt-1">
									{registerErrors.password.message}
								</p>
						  )}
				</div>

				{state === "register" && (
					<div className="w-full">
						<p>Confirm Password</p>
						<input
							{...registerSignUp("confirmPassword")}
							placeholder="Confirm your password"
							className={`border ${
								registerErrors.confirmPassword
									? "border-red-500"
									: "border-gray-200"
							} rounded w-full p-2 mt-1 outline-primary`}
							type="password"
							disabled={loading === "pending"}
						/>
						{registerErrors.confirmPassword && (
							<p className="text-red-500 text-sm mt-1">
								{registerErrors.confirmPassword.message}
							</p>
						)}
					</div>
				)}

				<button
					type="submit"
					className="w-full py-2 bg-primary hover:bg-primary-dull transition text-white rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={loading === "pending"}
				>
					{loading === "pending" ? (
						<div className="flex items-center justify-center">
							<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
						</div>
					) : state === "login" ? (
						"Login"
					) : (
						"Sign Up"
					)}
				</button>

				<p className="text-sm text-center w-full">
					{state === "login"
						? "Don't have an account?"
						: "Already have an account?"}{" "}
					<button
						type="button"
						onClick={() => switchForm(state === "login" ? "register" : "login")}
						className="text-primary cursor-pointer hover:underline"
						disabled={loading === "pending"}
					>
						{state === "login" ? "Sign Up" : "Login"}
					</button>
				</p>
			</form>
		</div>
	);
};

export default Login;
