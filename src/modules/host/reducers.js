import types from "./types";

const initialState = {
    status: null,
    id: null,
    error: null,
    stripeAccountId: null,
    loading: false,
    eventsLoading: false,
    initialLoad: true,
    cancelInProgress: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CHEF_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_CHEF_SUCCESS:
            return {
                ...state,
                id: action.payload.chef.id,
                status: action.payload.chef.status,
                stripeAccountId: action.payload.chef.stripeAccountId,
                loading: false
            };
        case types.GET_CHEF_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case types.CREATE_APPLICATION_REQUEST:
            return {
                ...state
            };
        case types.CREATE_APPLICATION_SUCCESS:
            return {
                ...state,
                status: "REQ"
            };
        case types.CREATE_APPLICATION_ERROR:
            return {
                ...state,
                error: action.error
            };
        case types.LOAD_HOSTING_EVENTS_REQUEST:
            return {
                ...state,
                eventsLoading: true
            };
        case types.LOAD_HOSTING_EVENTS_SUCCESS:
            return {
                ...state,
                eventsLoading: false,
                initialLoad: false
            };
        case types.LOAD_HOSTING_EVENTS_ERROR:
            return {
                ...state,
                eventsLoading: false,
                error: action.error
            };
        case types.CANCEL_EVENT_REQUEST:
            return {
                ...state,
                cancelInProgress: true
            };
        case types.CANCEL_EVENT_SUCCESS:
            return {
                ...state,
                cancelInProgress: false
            };
        case types.CANCEL_EVENT_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;
