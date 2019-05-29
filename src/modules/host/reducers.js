import types from "./types";

const initialState = {
    status: null,
    id: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CHEF_REQUEST:
            return {
                ...state
            };
        case types.GET_CHEF_SUCCESS:
            return {
                ...state,
                id: action.payload.chef.id,
                status: action.payload.chef.state
            };
        case types.GET_CHEF_ERROR:
            return {
                ...state,
                error: action.error
            };
        case types.CREATE_APPLICATION_REQUEST:
            return {
                ...state
            };
        case types.CREATE_APPLICATION_SUCCESS:
            return {
                ...state
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
