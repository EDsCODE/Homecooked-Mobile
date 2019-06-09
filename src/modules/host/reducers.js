import types from "./types";

const initialState = {
    status: null,
    id: null,
    error: null,
    stripeAccountId: null,
    loading: false
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
                status: action.payload.chef.state,
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
        default:
            return state;
    }
};

export default reducer;
