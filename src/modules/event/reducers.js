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
        default:
            return state;
    }
};

export default reducer;
