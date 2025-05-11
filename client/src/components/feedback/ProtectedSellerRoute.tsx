import { useAppSelector } from "@store/hooks";
import { Navigate } from "react-router-dom";

const ProtectedSellerRoute = ({ children }: { children: React.ReactNode }) => {
	const { state } = useAppSelector((state) => state.user);
	const isSeller = state === "seller";

	if (isSeller) {
		return <>{children}</>;
	}

	return <Navigate to="/login" />;
};

export default ProtectedSellerRoute;