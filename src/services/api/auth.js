import request from "Homecooked/src/utils/request";

const login = (email, password) => {
    return request({
        method: "GET",
        url: "/auth/login",
        params: {
            email,
            password
        }
    });
};

const register = (email, password, firstName) => {
    return request({
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        url: "/auth/register",
        data: {
            email,
            password,
            firstName
        }
    });
};

const refreshToken = (email, refreshToken) => {
    return request({
        method: "POST",
        url: "/auth/token",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            refreshToken
        })
    });
};

// TODO: password reset

const AuthService = {
    login,
    register,
    refreshToken
};

export default AuthService;
