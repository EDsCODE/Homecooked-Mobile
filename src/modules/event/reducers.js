import types from "./types";
import { normalize } from "Homecooked/src/utils/normalize";
import { EventViewTypes } from "Homecooked/src/types/";

const initialState = {
    byId: {},
    mode: EventViewTypes.FEED,
    selectedEvent: "",
    relatedBooking: "",
    parentRoute: "",
    preview: null,
    eventForm: null,
    loading: false,
    error: null,
    actionLoading: false,
    refundInProgress: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_EVENTS_REQUEST:
            return {
                ...state
            };
        case types.GET_EVENTS_SUCCESS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...normalize(formatAllEvents(action.events), "id")
                }
            };
        case types.GET_EVENTS_ERROR:
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
                    [`${action.event.id}`]: formatEvent(action.event)
                }
            };
        case types.GET_EVENT_ERROR:
            return {
                ...state,
                error: action.error
            };
        case types.UPDATE_EVENT_REQUEST:
            return {
                ...state
            };
        case types.UPDATE_EVENT_SUCCESS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [`${action.event.id}`]: formatEvent(action.event)
                }
            };
        case types.UPDATE_EVENT_ERROR:
            return {
                ...state,
                error: action.error
            };
        case types.SELECT_EVENT:
            return {
                ...state,
                selectedEvent: action.payload.eventId,
                relatedBooking: action.payload.relatedBooking,
                mode: action.payload.mode,
                parentRoute: action.payload.parentRoute,
                preview: action.payload.preview,
                eventForm: action.payload.eventForm,
                loading:
                    action.payload.mode == EventViewTypes.PREVIEW ? false : true
            };
        case types.GET_EVENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case types.GET_EVENT_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case types.BOOK_EVENT_REQUEST:
            return {
                ...state,
                actionLoading: true
            };
        case types.BOOK_EVENT_SUCCESS:
            return {
                ...state,
                actionLoading: false,
                error: false
            };
        case types.BOOK_EVENT_ERROR:
            return {
                ...state,
                error: action.error,
                actionLoading: false
            };
        case types.REFUND_BOOKING_REQUEST:
            return {
                ...state,
                actionLoading: true
            };
        case types.REFUND_BOOKING_SUCCESS:
            return {
                ...state,
                actionLoading: false
            };
        case types.REFUND_BOOKING_ERROR:
            return {
                ...state,
                actionLoading: false,
                error: action.error
            };
        case types.CREATE_EVENT_REQUEST:
            return {
                ...state,
                actionLoading: true
            };
        case types.CREATE_EVENT_SUCCESS:
            return {
                ...state,
                actionLoading: false
            };
        case types.CREATE_EVENT_ERROR:
            return {
                ...state,
                actionLoading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;

function formatAllEvents(events) {
    events.forEach((item, i) => {
        events[i] = formatEvent(item);
    });
    return events;
}

function formatEvent(event) {
    event.attributes = unwrapAttributes(event.attributes);
    return event;
}

function unwrapAttributes(attributesArr) {
    let result = {};
    attributesArr.forEach(item => {
        if (item.settingType.multiple) {
            result[item.settingType.fieldType] = [];
        }
    });
    attributesArr.forEach(item => {
        if (item.settingType.multiple) {
            result[item.settingType.fieldType] = [
                ...result[item.settingType.fieldType],
                processValue(item)
            ];
        } else {
            result[item.settingType.fieldType] = processValue(item);
        }
    });
    return result;
}

function processValue(item) {
    if (item.settingType.constrained) {
        return item.value;
    } else {
        return processConstraint(
            item.unconstrainedValue,
            item.settingType.dataType
        );
    }
}

function processConstraint(value, type) {
    switch (type) {
        case "integer":
            return parseInt(value);
        default:
            return value;
    }
}
