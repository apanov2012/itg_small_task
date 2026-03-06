import axios from "axios";
import type { IUserLoginData } from "../types";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const AUTH = "auth/";
const requestAuth = (user: IUserLoginData) => {
    return axios({
        method: "post",
        url: `${BASE_URL}${AUTH}login`,
        data: {
            username: user.username,
            password: user.password
        }
    });
};
const refreshToken = (token: string) => {
    return axios({
        method: "post",
        url: `${BASE_URL}${AUTH}refresh`,
        data: {
            refreshToken: token
        }
    });
};
export { requestAuth, refreshToken };
// "username": "emilys",
//       "password": "emilyspass",
