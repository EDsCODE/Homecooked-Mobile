import types from "./types";

const initialState = {
    loading: false,
    initialLoad: true,
    refundInProgress: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_HISTORY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.LOAD_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                initialLoad: false,
                error: null
            };
        case types.LOAD_HISTORY_ERROR:
            return {
                ...state,
                error: action.error
            };
        case types.REFUND_BOOKING_REQUEST:
            return {
                ...state,
                refundInProgress: true
            };
        case types.REFUND_BOOKING_SUCCESS:
            return {
                ...state,
                refundInProgress: false,
                error: null
            };
        case types.REFUND_BOOKING_ERROR:
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
