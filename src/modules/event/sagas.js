import {
    takeLatest,
    call,
    put,
    fork,
    all,
    select,
    takeEvery
} from "redux-saga/effects";
import {
    EventService,
    ImageService,
    BookingService
} from "Homecooked/src/services/api";
import types from "./types";
import { getBookingsForEvent } from "Homecooked/src/modules/booking/sagas";
import * as hostSelectors from "Homecooked/src/modules/host/selectors";
import * as currentUserSelectors from "Homecooked/src/modules/currentUser/selectors";
import * as eventSelectors from "Homecooked/src/modules/event/selectors";
import NavigationService from "Homecooked/src/utils/NavigationService";
import { EventViewTypes } from "Homecooked/src/types/";
import { currentUserTypes } from "../types";

export function* getActiveEventsWorkerSaga(action) {
    try {
        const { data } = yield call(EventService.getActiveEvents);
        if (!data) {
            throw new Error("Could not retrieve events");
        }
        yield all(
            data.map((event, i) => {
                return call(function*() {
                    // retireve images
                    if (event.chefProfileImageKey) {
                        let { data: chefProfileImageSignedUrl } = yield call(
                            ImageService.getImage,
                            event.chefProfileImageKey
                        );
                        event[
                            "chefProfileImageSignedUrl"
                        ] = chefProfileImageSignedUrl;
                    }
                    if (event.eventImageKey1) {
                        let { data: eventImage1SignedUrl } = yield call(
                            ImageService.getImage,
                            event.eventImageKey1
                        );
                        event["eventImage1SignedUrl"] = eventImage1SignedUrl;
                    }
                    if (event.eventImageKey2) {
                        let { data: eventImage2SignedUrl } = yield call(
                            ImageService.getImage,
                            event.eventImageKey2
                        );
                        event["eventImage2SignedUrl"] = eventImage2SignedUrl;
                    }
                    if (event.eventImageKey3) {
                        let { data: eventImage3SignedUrl } = yield call(
                            ImageService.getImage,
                            event.eventImageKey3
                        );
                        event["eventImage3SignedUrl"] = eventImage3SignedUrl;
                    }
                    data[i] = event;
                });
            })
        );

        yield put({ type: types.GET_EVENTS_SUCCESS, events: data });
    } catch (error) {
        yield put({ type: types.GET_EVENTS_ERROR, error });
    }
}

export function* getEventDetails(action) {
    try {
        NavigationService.navigate(action.payload.parentRoute + "Event");
        if (action.payload.mode != EventViewTypes.PREVIEW) {
            yield call(getBookingsForEvent, action.payload.eventId);
        }
        yield put({ type: types.GET_EVENT_DETAILS_SUCCESS });
    } catch (error) {
        yield put({ type: types.GET_EVENT_DETAILS_ERROR, error });
    }
}

export function* getEventWorkerSaga(action) {
    try {
        const { data } = yield call(EventService.getEventById, action.eventId);

        yield put({ type: types.GET_EVENT_SUCCESS, event: data });
    } catch (error) {
        yield put({ type: types.GET_EVENT_ERROR, error });
    }
}

export function* getEventsByChefIdWorkerSaga(action) {
    try {
        let chefId = yield select(hostSelectors.chefId);
        const { data } = yield call(EventService.getEventsByChefId, chefId);

        yield put({ type: types.GET_EVENTS_SUCCESS, events: data });
    } catch (error) {
        yield put({ type: types.GET_EVENTS_ERROR, error });
    }
}

export function* updateEventStatusSaga(eventId, status) {
    try {
        let event;
        if (status == "CAN") {
            let { data } = yield call(EventService.cancelEvent, eventId);
            event = data;
        } else {
            throw new Error("Invalid Status");
        }
        yield put({ type: types.UPDATE_EVENT_SUCCESS, event });
    } catch (error) {
        yield put({ type: types.UPDATE_EVENT_ERROR, error });
    }
}

export function* createEventWorkerSaga(eventData) {
    try {
        let { data: event } = yield call(EventService.createEvent, eventData);
        yield put({ type: types.UPDATE_EVENT_SUCCESS, event });
    } catch (error) {
        yield put({ type: types.UPDATE_EVENT_ERROR, error });
    }
}

function* bookEventWorkerSaga(action) {
    try {
        let { paymentToken } = action.payload;
        let eventId = yield select(eventSelectors.selectedEventId);
        let userId = yield select(currentUserSelectors.userId);
        const { data: booking } = yield call(
            BookingService.createBooking,
            userId,
            eventId,
            paymentToken
        );
        yield put({ type: currentUserTypes.ADD_BOOKING, booking });
        yield put({ type: types.BOOK_EVENT_SUCCESS });
    } catch (error) {
        yield put({ type: types.BOOK_EVENT_ERROR, error });
    }
}

function* refundBookingWorkerSaga(action) {
    try {
        let { id } = yield select(eventSelectors.relatedBooking);
        let { data: booking } = yield call(BookingService.refundBooking, id);
        yield put({ type: currentUserTypes.ADD_BOOKING, booking });
        yield put({ type: types.REFUND_BOOKING_SUCCESS });
    } catch (error) {
        yield put({ type: types.REFUND_BOOKING_ERROR, error });
    }
}

export const eventSagas = [
    takeLatest(types.GET_EVENTS_REQUEST, getActiveEventsWorkerSaga),
    takeEvery(types.SELECT_EVENT, getEventDetails),
    takeLatest(types.BOOK_EVENT_REQUEST, bookEventWorkerSaga),
    takeLatest(types.REFUND_BOOKING_REQUEST, refundBookingWorkerSaga)
];
