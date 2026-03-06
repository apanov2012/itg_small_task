import axios from "axios";
import type { IUser } from "../types";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const USERS = "users/";
const addNewUser = (user: IUser) => {
    return axios({
        method: "post",
        url: `${BASE_URL}${USERS}add`,
        params: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }
    });
};
export { addNewUser };
