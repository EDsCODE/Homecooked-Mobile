import types from "./types";
import { normalize } from "Homecooked/src/utils/normalize";

const initialState = {
    status: null,
    id: null,
    type: null,
    error: null,
    stripeAccountId: null,
    eventsLoading: false,
    initialLoad: true,
    cancelInProgress: false,
    postingInProgress: false,
    preferences: {},
    loading: false,
    loadingAvatar: false,
    profileImageSignedUrl: null,
    description: null,
    profileImageUrl: null,
    actionLoading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CHEF_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_CHEF_SUCCESS:
            let fields = [];
            for (
                let i = 0;
                i < action.payload.preferences.preferences.length;
                i++
            ) {
                let values =
                    action.payload.preferences.preferences[i].allowedValues;
                values = normalize(values, "itemValue");
                fields.push({
                    ...action.payload.preferences.preferences[i],
                    allowedValues: values
                });
            }
            return {
                ...state,
                id: action.payload.chef.id,
                status: action.payload.chef.status,
                stripeAccountId: action.payload.chef.stripeAccountId,
                type: action.payload.chef.type,
                preferences: {
                    ...action.payload.preferences,
                    fields: normalize(fields, "fieldType")
                },
                profileImageUrl: action.payload.chef.profileImageUrl,
                description: action.payload.chef.description,
                media: action.payload.media,
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
                ...state,
                actionLoading: true
            };
        case types.CREATE_APPLICATION_SUCCESS:
            return {
                ...state,
                status: "REQ",
                actionLoading: false
            };
        case types.CREATE_APPLICATION_ERROR:
            return {
                ...state,
                error: action.error,
                actionLoading: false
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
        case types.POST_EVENT_REQUEST:
            return {
                ...state,
                postingInProgress: true
            };
        case types.POST_EVENT_SUCCESS:
            return {
                ...state,
                postingInProgress: false
            };
        case types.POST_EVENT_ERROR:
            return {
                ...state,
                postingInProgress: false,
                error: action.error
            };
        case types.UPDATE_ACCOUNT_ID:
            return {
                ...state,
                stripeAccountId: action.payload.stripeAccountId
            };
        case types.UPLOAD_HOST_IMAGE_REQUEST:
            return {
                ...state
            };
        case types.UPLOAD_HOST_IMAGE_SUCCESS:
            return {
                ...state,
                profileImageUrl: action.payload.key
            };
        case types.UPLOAD_HOST_IMAGE_ERROR:
            return {
                ...state
            };
        case types.GET_HOST_AVATAR_REQUEST:
            return {
                ...state,
                loadingAvatar: true
            };
        case types.UPDATE_HOST_SUCCESS:
            let { description } = action.payload;
            return {
                ...state,
                description: description
            };
        case types.GET_HOST_AVATAR_SUCCESS:
            return {
                ...state,
                loadingAvatar: false,
                profileImageSignedUrl: action.payload.profileImageSignedUrl
            };
        case types.GET_HOST_AVATAR_ERROR:
            return {
                ...state,
                loadingAvatar: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;
