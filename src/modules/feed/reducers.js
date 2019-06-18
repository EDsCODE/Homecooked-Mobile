import types from "./types";

const initialState = {
    loading: false,
    initialLoad: true,
    bookingInProgress: false,
    error: null,
    filterByCity: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_FEED_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.LOAD_FEED_SUCCESS:
            return {
                ...state,
                loading: false,
                initialLoad: false
            };
        case types.LOAD_FEED_ERROR:
            return {
                ...state,
                error: action.error
            };

        case types.CITY_FILTER_SELECTED:
            return {
                ...state,
                filterByCity: action.payload.city
            };
        default: {
            return state;
        }
    }
};

export default reducer;
