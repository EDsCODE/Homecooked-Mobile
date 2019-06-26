import types from "./types";

const initialState = {
    loading: false,
    initialLoad: true,
    refundInProgress: false,
    data: [],
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                initialLoad: false,
                loading: false,
                data: action.payload.notifications,
                error: null
            };
        case types.GET_NOTIFICATIONS_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return {
                ...state
            };
    }
};

export default reducer;
