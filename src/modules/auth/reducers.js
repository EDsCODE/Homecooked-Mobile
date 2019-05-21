import types from "./types";

const initialState = {
    authenticating: false,
    starting: true,
    accessToken: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGNUP_ERROR:
            return {
                ...state,
                error: action.error
            };
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                accessToken: action.accessToken
            };
        case types.SIGNUP_REQUEST:
            return {
                ...state
            };
        case types.AUTO_LOGIN_START:
            return {
                ...state,
                authenticating: true,
                error: null
            };
        case types.AUTO_LOGIN_SUCCESS:
            return {
                ...state,
                authenticating: false,
                starting: false,
                accessToken: action.accessToken,
                error: null
            };
        case types.AUTO_LOGIN_ERROR:
            return {
                ...state,
                authenticating: false,
                starting: false,
                accessToken: null,
                error: action.error
            };
        case types.LOGIN_REQUEST:
            return { ...state, authenticating: true, error: null };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                authenticating: false,
                accessToken: action.accessToken
            };
        case types.LOGIN_ERROR:
            return {
                ...state,
                authenticating: false,
                accessToken: null,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;
