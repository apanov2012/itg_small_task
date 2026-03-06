import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { refreshToken, requestAuth } from "../services/authApiService";
interface IAuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuth: boolean;
    loginInfo: {
        username: string;
        password: string;
    };
    invalidInfo: boolean;
    isRemember: boolean;
    passIsVisible: boolean;
    authLoading: boolean;
}
interface IAuthActions {
    initialTokenRequest: () => void;
    setAccessToken: (token: string | null) => void;
    setLoginInfo: (field: string, value: string) => void;
    setPassIsVisible: (value: boolean) => void;
    setIsRemember: (value: boolean) => void;
    login: () => void;
    logout: () => void;
}
interface IAuthInitialState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuth: boolean;
    loginInfo: {
        username: string;
        password: string;
    };
    invalidInfo: boolean;
    isRemember: boolean;
    passIsVisible: boolean;
    authLoading: boolean;
}
interface IAuthStore extends IAuthState, IAuthActions {}
const AuthInitialState: IAuthInitialState = {
    accessToken: null,
    refreshToken: null,
    isAuth: false,
    loginInfo: {
        username: "",
        password: ""
    },
    invalidInfo: false,
    isRemember: false,
    passIsVisible: false,
    authLoading: false
};
const AuthStore: StateCreator<IAuthStore, [["zustand/devtools", never]]> = (
    set,
    get
) => ({
    ...AuthInitialState,
    setLoginInfo: (field: string, value: string) =>
        set((state) => ({
            loginInfo: {
                ...state.loginInfo,
                [field]: value
            }
        })),
    setIsRemember: (value: boolean) => {
        set({
            isRemember: value
        });
    },
    setPassIsVisible: (value: boolean) => {
        set({
            passIsVisible: value
        });
    },
    setAccessToken: (token: string | null) => {
        set({
            accessToken: token,
            isAuth: token ? true : false
        });
    },
    login: () => {
        set({
            authLoading: true
        });
        requestAuth(get().loginInfo)
            .then((res) => {
                if (res.status === 200) {
                    set({
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                        isAuth: true,
                        invalidInfo: false
                    });
                    if (get().isRemember) {
                        localStorage.setItem(
                            "unsafeToken",
                            res.data.refreshToken
                        );
                    }
                }
            })
            .catch(() => {
                set({
                    invalidInfo: true
                });
            })
            .finally(() => {
                set({
                    authLoading: false
                });
            });
    },
    logout: () => {
        set({ ...AuthInitialState });
        localStorage.removeItem("unsafeToken");
    },
    initialTokenRequest: () => {
        set({
            authLoading: true
        });
        const unsafeToken: string | null = localStorage.getItem("unsafeToken");
        if (unsafeToken) {
            refreshToken(unsafeToken)
                .then((res) =>
                    res.status === 401
                        ? setAccessToken(null)
                        : setAccessToken(res.data.accessToken)
                )
                .catch(() => setAccessToken(null))
                .finally(() =>
                    set({
                        authLoading: false
                    })
                );
        } else {
            set({
                authLoading: false
            });
        }
    }
});
export const useAuthStore = create<IAuthStore>()(
    devtools(AuthStore, { name: "AuthStore" })
);
//
useAuthStore.getState().initialTokenRequest();
// внешние методы
export const setAccessToken = (token: string | null) =>
    useAuthStore.getState().setAccessToken(token);
export const login = () => useAuthStore.getState().login();
export const logout = () => useAuthStore.getState().logout();
export const setLoginInfo = (field: string, value: string) =>
    useAuthStore.getState().setLoginInfo(field, value);
export const setPassIsVisible = (value: boolean) =>
    useAuthStore.getState().setPassIsVisible(value);
export const setIsRemember = (value: boolean) =>
    useAuthStore.getState().setIsRemember(value);
