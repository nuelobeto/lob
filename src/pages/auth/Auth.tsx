import { routes } from "@/router/routes";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (pathname === `/${routes.auth}`) {
			navigate(`/${routes.auth}/${routes.sign_in}`);
		}
	}, [navigate, pathname]);

	return <Outlet />;
};

export default Auth;
