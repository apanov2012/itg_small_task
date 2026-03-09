import styles from "@/App.module.css";
import {
    login,
    setIsRemember,
    setLoginInfo,
    setPassIsVisible,
    useAuthStore
} from "../stores/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";

const LoginPage = () => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const authLoading = useAuthStore((state) => state.authLoading);
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate("/", { replace: true });
        }
    }, [isAuth]);
    const username = useAuthStore((state) => state.loginInfo.username);
    const password = useAuthStore((state) => state.loginInfo.password);
    const passIsVisible = useAuthStore((state) => state.passIsVisible);
    const isRemember = useAuthStore((state) => state.isRemember);
    const invalidInfo = useAuthStore((state) => state.invalidInfo);
    return (
        <div className={`${styles.LoginPage_back}`}>
            {authLoading && (
                <div className={`${styles.LoginPage_form_back}`}>
                    <Loader />
                </div>
            )}
            {!isAuth && !authLoading && (
                <div className={`${styles.LoginPage_form_back}`}>
                    <div className={`${styles.LoginPage_form_title}`}>
                        <div
                            className={`${styles.LoginPage_logo_img} imgBack`}
                        ></div>
                        <div className={`${styles.LoginPage_title} bold`}>
                            {`Добро пожаловать!`}
                        </div>
                        <div
                            className={`${styles.LoginPage_desc} ${invalidInfo ? "cred" : "cgray"}`}
                        >{`${invalidInfo ? "Неверное имя пользователя или пароль" : "Пожалуйста, авторизуйтесь"}`}</div>
                    </div>

                    <div className={`${styles.LoginPage_form_main}`}>
                        {/* login */}
                        <div className={`${styles.LoginPage_form_main_item}`}>
                            <div
                                className={`${styles.LoginPage_form_main_item_title}`}
                            >
                                {`Логин`}
                            </div>
                            <div
                                className={`${styles.LoginPage_form_main_item_input_back}`}
                            >
                                <div
                                    className={`${styles.LoginPage_form_main_item_input_person_img} imgBack`}
                                ></div>
                                <input
                                    type="text"
                                    placeholder={`Введите логин`}
                                    className={`${styles.LoginPage_form_main_item_input}`}
                                    value={username}
                                    onChange={(e) =>
                                        setLoginInfo("username", e.target.value)
                                    }
                                />
                                {username && (
                                    <button
                                        type="button"
                                        className={`${styles.LoginPage_form_main_item_input_cancel_img} imgBack cp`}
                                        onClick={() =>
                                            setLoginInfo("username", "")
                                        }
                                    ></button>
                                )}
                            </div>
                        </div>
                        {/* pass */}
                        <div
                            className={`${styles.LoginPage_form_main_item} mt-16`}
                        >
                            <div
                                className={`${styles.LoginPage_form_main_item_title}`}
                            >
                                {`Пароль`}
                            </div>
                            <div
                                className={`${styles.LoginPage_form_main_item_input_back}`}
                            >
                                <div
                                    className={`${styles.LoginPage_form_main_item_input_lock_img} imgBack`}
                                ></div>
                                <input
                                    type={passIsVisible ? "text" : "password"}
                                    placeholder={`Введите пароль`}
                                    className={`${styles.LoginPage_form_main_item_input}`}
                                    value={password}
                                    onChange={(e) =>
                                        setLoginInfo("password", e.target.value)
                                    }
                                />

                                <button
                                    type="button"
                                    className={`${passIsVisible ? styles.LoginPage_form_main_item_input_visible_img : styles.LoginPage_form_main_item_input_invisible_img} imgBack cp`}
                                    onClick={() =>
                                        setPassIsVisible(!passIsVisible)
                                    }
                                ></button>
                            </div>
                        </div>
                    </div>
                    {/* remember */}
                    <button
                        type="button"
                        className={`${styles.LoginPage_form_main_isRemember_back} mt-20 cp fs-16`}
                        onClick={() => setIsRemember(!isRemember)}
                    >
                        <div
                            className={`${styles.LoginPage_form_main_isRemember_checkbox} ${isRemember ? styles.LoginPage_form_main_isRemember_checkbox_checked : ""} cp`}
                        ></div>
                        <span className="ml-10 cdgray">{`Запомнить данные`}</span>
                    </button>
                    {/* submit */}
                    <button
                        type="button"
                        className={`${username && password ? styles.LoginPage_form_main_submit : styles.LoginPage_form_main_submit_unactive} mt-20 fs-16`}
                        onClick={() => {
                            username && password && login();
                        }}
                    >{`Войти`}</button>
                    {/* footer */}
                    <div
                        className={`${styles.LoginPage_form_footer_alt_back} mt-16`}
                    >
                        <div
                            className={`${styles.LoginPage_form_footer_hline}`}
                        ></div>
                        <span className="pl-10 pr-10 cgray">{`или`}</span>
                        <div
                            className={`${styles.LoginPage_form_footer_hline}`}
                        ></div>
                    </div>
                    <div
                        className={`${styles.LoginPage_form_footer_create_back}`}
                    >
                        <span className="cdgray">{`Нет аккаунта?`}</span>
                        <button
                            type="button"
                            className={`${styles.LoginPage_form_footer_create_span} cp ml-10 fs-17`}
                        >{`Создать`}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
