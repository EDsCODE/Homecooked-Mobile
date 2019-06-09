import types from "./types";

const initialState = {
    loading: false,
    events: [],
    bookings: [],
    initialLoad: true,
    bookingInProgress: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RETRIEVE_EVENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.RETRIEVE_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.events,
                loading: false,
                initialLoad: false
            };
        case types.RETRIEVE_EVENTS_ERROR:
            return {
                ...state
            };
        case types.RETRIEVE_BOOKINGS_REQUEST:
            return {
                ...state
            };
        case types.RETRIEVE_BOOKINGS_SUCCESS:
            return {
                ...state,
                bookings: {
                    ...state.bookings,
                    ...action.bookings
                }
            };
        case types.RETRIEVE_BOOKINGS_ERROR:
            return {
                ...state
            };

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
        case types.BOOK_EVENT_REQUEST:
            return {
                ...state,
                bookingInProgress: true
            };
        case types.BOOK_EVENT_SUCCESS:
            return {
                ...state,
                bookingInProgress: false
            };
        case types.BOOK_EVENT_ERROR:
            return {
                ...state,
                error: action.error
            };
        default: {
            return state;
        }
    }
};

export default reducer;
