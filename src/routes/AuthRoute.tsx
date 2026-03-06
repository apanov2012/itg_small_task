import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";

const AuthRoute = () => {
    const isAuth = useAuthStore((state) => state.isAuth);
    if (!isAuth) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }
    return <Outlet />;
};
export default AuthRoute;
