import types from "./types";

const intialState = {
    byId: {},
    byEvent: {},
    error: null
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case types.CREATE_BOOKING_REQUEST:
            return {
                ...state
            };
        case types.CREATE_BOOKING_SUCCESS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.booking.id]: action.booking
                }
            };
        case types.CREATE_BOOKING_ERROR:
            return {
                ...state,
                error: action.error
            };
        case types.UPDATE_BOOKING_STATUS_REQUEST:
            return {
                ...state
            };
        case types.UPDATE_BOOKING_STATUS_SUCCESS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.booking.id]: action.booking
                }
            };
        case types.UPDATE_BOOKING_STATUS_ERROR:
            return {
                ...state,
                error: action.error
            };
        case types.GET_BOOKINGS_BY_EVENT_SUCCESS:
            return {
                ...state,
                byEvent: {
                    ...state.byEvent,
                    [action.payload.eventId]: action.payload.bookings
                }
            };
        default:
            return {
                ...state
            };
    }
};

export default reducer;
