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

const register = (email, password, personal, account) => {
    return request({
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        url: "/auth/register",
        data: {
            email,
            password,
            personal,
            account
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

const facebookLogin = (email, firstName, lastName) => {
    return request({
        method: "POST",
        url: "/auth/facebook/login",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            email,
            firstName,
            lastName
        }
    });
};

const AuthService = {
    login,
    register,
    refreshToken,
    signout,
    facebookLogin
};

export default AuthService;
