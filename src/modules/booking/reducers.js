import types from "./types";
import { normalize } from "Homecooked/src/utils/normalize";

const intialState = {
    byId: {},
    byEvent: {},
    error: null
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case types.GET_CURRENT_BOOKINGS_REQUEST:
            return {
                ...state
            };
        case types.GET_CURRENT_BOOKINGS_SUCCESS:
            return {
                ...state,
                byId: normalize(action.bookings, "id")
            };
        case types.GET_CURRENT_BOOKINGS_ERROR:
            return {
                ...state
            };
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
        default:
            return {
                ...state
            };
    }
};

export default reducer;
