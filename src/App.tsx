import "./App.css";
import styles from "./App.module.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthRoute from "./routes/AuthRoute";
import { useAuthStore } from "./stores/useAuthStore";
import LoginPage from "./pages/loginPage";
import GoodsPage from "./pages/goodsPage";
import Loader from "./components/loader";

const App = () => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const authLoading = useAuthStore((state) => state.authLoading);
    return (
        <div className={`${styles.App}`}>
            {authLoading ? (
                <Loader />
            ) : (
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            index
                            element={
                                <Navigate
                                    to={isAuth ? "/goods" : "/login"}
                                    replace
                                />
                            }
                        />
                        <Route
                            path="/login"
                            element={<LoginPage />}
                        />
                        <Route element={<AuthRoute />}>
                            <Route
                                path="/goods"
                                element={<GoodsPage />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    );
};

export default App;
