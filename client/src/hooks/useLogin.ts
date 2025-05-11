import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginType } from "@validations/LoginSchema";
import { RegisterSchema, type RegisterType } from "@validations/RegisterSchema";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setShowUserLogin } from "@store/user/userSlice";
import { actLogin, actRegister } from "@store/user/userSlice";
import { toast } from "react-toastify";
import { isString } from "@customTypes/GuradsTypes";

const useLogin = () => {
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector((state) => state.user);
	const [state, setState] = useState<"login" | "register">("login");

	const {
		register: registerLogin,
		handleSubmit: handleSubmitLogin,
		formState: { errors: loginErrors },
		reset: resetLogin,
	} = useForm<LoginType>({
		mode: "onBlur",
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const {
		register: registerSignUp,
		handleSubmit: handleSubmitRegister,
		formState: { errors: registerErrors },
		reset: resetRegister,
	} = useForm<RegisterType>({
		mode: "onBlur",
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmitLogin = async (data: LoginType) => {
		try {
			await dispatch(actLogin(data)).unwrap();
			toast.success("Login successful!");
			dispatch(setShowUserLogin());
		} catch (error) {
			toast.error(isString(error) ? error : "");
		}
	};

	const onSubmitRegister = async (data: RegisterType) => {
		try {
			await dispatch(actRegister(data)).unwrap();
			toast.success("Registration successful!");
			dispatch(setShowUserLogin());
		} catch (error) {
			toast.error(isString(error) ? error : "");
		}
	};

	const switchForm = (newState: "login" | "register") => {
		setState(newState);
		if (newState === "login") {
			resetRegister();
		} else {
			resetLogin();
		}
	};

	return {
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
	};
};

export default useLogin;
