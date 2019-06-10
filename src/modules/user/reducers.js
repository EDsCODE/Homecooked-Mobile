import types from "./types";

const initialState = {
    byId: {},
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER_REQUEST:
            return {
                ...state
            };
        case types.GET_USER_SUCCESS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.user.id]: action.user
                }
            };
        case types.GET_USER_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;
