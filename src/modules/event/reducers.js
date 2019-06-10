import types from "./types";
import { normalize } from "Homecooked/src/utils/normalize";

const initialState = {
    byId: {},
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ACTIVE_EVENTS_REQUEST:
            return {
                ...state
            };
        case types.GET_ACTIVE_EVENTS_SUCCESS:
            return {
                ...state,
                byId: {
                    ...state.data,
                    ...normalize(action.events, "id")
                }
            };
        case types.GET_ACTIVE_EVENTS_ERROR:
            return {
                ...state
            };
        case types.GET_EVENT_REQUEST:
            return {
                ...state
            };
        case types.GET_EVENT_SUCCESS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.event.id]: action.event
                }
            };
        case types.GET_EVENT_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;
