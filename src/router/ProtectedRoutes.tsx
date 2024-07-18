import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { routes } from "./routes";

const ProtectedRoutes = () => {
	const user = null;
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate(`/${routes.auth}`);
		}
	}, [user, navigate]);

	return <Outlet />;
};

export default ProtectedRoutes;
