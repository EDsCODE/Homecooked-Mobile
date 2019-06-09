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
        data: {
            email,
            token: refreshToken
        }
    });
};

// TODO: password reset

const signout = refreshToken => {
    return request({
        method: "POST",
        url: "/auth/logout",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            token: refreshToken
        }
    });
};

const AuthService = {
    login,
    register,
    refreshToken,
    signout
};

export default AuthService;
