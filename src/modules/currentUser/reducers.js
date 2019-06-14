import types from "./types";

const initialState = {
    email: null,
    firstName: null,
    lastName: null,
    id: null,
    profileImageURL: null,
    stripeCustomerId: null,
    bio: null,
    isVerified: null,
    loading: false,
    isComplete: false,
    imageKey: null,
    imageURL: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_USER_REQUEST:
            return {
                ...state,
                error: null
            };
        case types.UPDATE_USER_SUCCESS:
            let {
                email,
                firstName,
                lastName,
                id,
                profileImageURL,
                stripeCustomerId,
                bio,
                isVerified
            } = action.payload;
            return {
                ...state,
                email: email ? email : state.email,
                firstName: firstName ? firstName : state.firstName,
                lastName: lastName ? lastName : state.lastName,
                id: id ? id : state.id,
                profileImageURL: profileImageURL
                    ? profileImageURL
                    : state.profileImageURL,
                stripeCustomerId: stripeCustomerId
                    ? stripeCustomerId
                    : state.stripeCustomerId,
                bio: bio ? bio : state.bio,
                isVerified: isVerified ? isVerified : state.isVerified,
                loading: false
            };
        case types.UPDATE_USER_ERROR:
            return {
                ...state,
                error: action.error
            };
        case types.UPLOAD_USER_IMAGE_REQUEST:
            return {
                ...state
            };
        case types.UPLOAD_USER_IMAGE_SUCCESS:
            return {
                ...state,
                imageKey: action.payload.key
            };
        case types.UPLOAD_USER_IMAGE_ERROR:
            return {
                ...state
            };
        case types.SAVE_PAYMENT_REQUEST:
            return {
                ...state
            };
        case types.SAVE_PAYMENT_SUCCESS:
            return {
                ...state,
                stripeCustomerId: action.payload
                    ? action.payload.stripeCustomerId
                    : state.stripeCustomerId
            };
        case types.SAVE_PAYMENT_ERROR:
            return {
                ...state,
                error
            };
        default:
            return state;
    }
};

export default reducer;
