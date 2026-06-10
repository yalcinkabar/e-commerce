import api from "../../api/axios";


import {
    SET_USER,
    SET_ROLES,
    SET_CATEGORIES,
} from "../actionTypes";


export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export const setRoles = (roles) => {
    return {
        type: SET_ROLES,
        payload: roles,
    };
};

export const fetchRoles = () => {
    return async (dispatch) => {
        try {
            const response = await api.get("/roles");

            dispatch(setRoles(response.data));
        } catch (error) {
            console.error(error);
        }
    };
};

export const loginUser = (formData) => {
    return async (dispatch) => {
        try {
            const response = await api.post("/login", formData);

            dispatch(setUser(response.data));

            return response.data;
        } catch (error) {
            throw error;
        }
    };
};

export const verifyToken = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) return;

            api.defaults.headers.common["Authorization"] = token;

            const response = await api.get("/verify");

            dispatch(setUser(response.data));

            if (response.data.token) {
                localStorage.setItem(
                    "token",
                    response.data.token
                );

                api.defaults.headers.common["Authorization"] =
                    response.data.token;
            }
        } catch (error) {
            localStorage.removeItem("token");

            delete api.defaults.headers.common[
                "Authorization"
            ];

            console.error(error);
        }
    };
};

export const setCategories = (categories) => {
    return {
        type: SET_CATEGORIES,
        payload: categories,
    };
};

export const fetchCategories = () => {
    return async (dispatch) => {
        try {
            const response = await api.get("/categories");

            console.log(response.data);

            dispatch(
                setCategories(response.data)
            );
        } catch (error) {
            console.error(error);
        }
    };
};