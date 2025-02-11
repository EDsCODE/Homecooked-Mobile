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
    BookingService,
    HostService
} from "Homecooked/src/services/api";
import types from "./types";
import { getBookingsForEvent } from "Homecooked/src/modules/booking/sagas";
import { getUserById } from "Homecooked/src/modules/user/sagas";
import { savePaymentWorkerSaga } from "Homecooked/src/modules/currentUser/sagas";
import * as hostSelectors from "Homecooked/src/modules/host/selectors";
import * as currentUserSelectors from "Homecooked/src/modules/currentUser/selectors";
import * as eventSelectors from "Homecooked/src/modules/event/selectors";
import NavigationService from "Homecooked/src/utils/NavigationService";
import { imageUtils } from "Homecooked/src/utils";
import { EventViewTypes } from "Homecooked/src/types/";
import { currentUserTypes } from "../types";
import _ from "lodash";

export function* getActiveEventsWorkerSaga(action) {
    try {
        const { data } = yield call(EventService.getActiveEvents);
        if (!data) {
            throw new Error("Could not retrieve events");
        }
        let events = yield all(data.map(event => call(getEventMedia, event)));

        yield put({ type: types.GET_EVENTS_SUCCESS, events: events });
    } catch (error) {
        yield put({ type: types.GET_EVENTS_ERROR, error });
    }
}

export function* getEventsByChefIdWorkerSaga(action) {
    try {
        let chefId = yield select(hostSelectors.chefId);
        const { data } = yield call(EventService.getEventsByChefId, chefId);
        let events = yield all(data.map(event => call(getEventMedia, event)));

        yield put({ type: types.GET_EVENTS_SUCCESS, events });
    } catch (error) {
        yield put({ type: types.GET_EVENTS_ERROR, error });
    }
}

export function* getEventWorkerSaga(action) {
    try {
        const { data } = yield call(EventService.getEventById, action.eventId);
        console.log("NEW EVENT: ", data);
        let event = yield call(getEventMedia, data);
        yield put({ type: types.GET_EVENT_SUCCESS, event });
    } catch (error) {
        yield put({ type: types.GET_EVENT_ERROR, error });
    }
}

function* getEventMedia(event) {
    let media = event.media.map(media => imageUtils.url(media.key));
    let { data: chef } = yield call(HostService.getChefById, event.chef.id);
    yield call(getUserById, chef.userId);

    media.unshift(imageUtils.url(chef.profileImageUrl));
    event.images = media;
    return event;
}

export function* getEventDetails(action) {
    try {
        if (action.payload.mode != EventViewTypes.PREVIEW) {
            yield call(getBookingsForEvent, action.payload.eventId);
        } else {
            NavigationService.navigate(action.payload.parentRoute + "Event");
        }
        yield put({ type: types.GET_EVENT_DETAILS_SUCCESS });
    } catch (error) {
        yield put({ type: types.GET_EVENT_DETAILS_ERROR, error });
    }
}

export function* createEventWorkerSaga(action) {
    try {
        let eventData = yield select(eventSelectors.eventForm);

        // upload images
        let toUpload = eventData.upload;
        let result = yield all(
            toUpload.map(image => call(ImageService.uploadImage, image))
        );
        //add uploaded images keys to mediakeys
        let mediaKeys = eventData.mediaKeys;
        result.forEach(media => {
            mediaKeys.push(media.data);
        });

        eventData.mediaKeys = mediaKeys;
        delete eventData.upload;

        let { data: eventId } = yield call(EventService.createEvent, eventData);
        yield call(getEventWorkerSaga, { eventId });
        yield put({ type: types.CREATE_EVENT_SUCCESS });
        NavigationService.navigate("CongratulationsPage");
    } catch (error) {
        yield put({ type: types.UPDATE_EVENT_ERROR, error });
    }
}

function* cancelEventWorkerSaga(action) {
    try {
        let eventId = yield select(eventSelectors.selectedEventId);
        yield call(EventService.cancelEvent, eventId);
        yield call(getEventWorkerSaga, { eventId });
        yield put({ type: types.CANCEL_EVENT_SUCCESS });
        NavigationService.navigate("CancelConfirmation");
    } catch (error) {
        yield put({ type: types.UPDATE_EVENT_ERROR, error });
    }
}

function* bookEventWorkerSaga(action) {
    try {
        let { payment } = action.payload;
        console.log(payment);
        if (payment.type == "customer") {
            yield call(savePaymentWorkerSaga, {
                payload: {
                    token: payment.source
                }
            });
        }
        let eventId = yield select(eventSelectors.selectedEventId);
        let userId = yield select(currentUserSelectors.userId);
        const { data: booking } = yield call(
            BookingService.createBooking,
            userId,
            eventId,
            payment
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
        NavigationService.navigate("RefundConfirmation");
    } catch (error) {
        yield put({ type: types.REFUND_BOOKING_ERROR, error });
    }
}

function* markAttendanceWorkerSaga(action) {
    try {
        let { eventId, attendees, reports } = action.payload;
        let chefId = yield select(hostSelectors.chefId);
        // mark attendance
        yield call(
            EventService.markAttendance,
            eventId,
            chefId,
            attendees,
            reports
        );
        yield put({ type: types.MARK_ATTENDANCE_SUCCESS });

        // close vent
        yield call(EventService.closeEvent, eventId);

        // get event
        yield call(getEventWorkerSaga, { eventId });

        // navigate to success screen
        NavigationService.navigate("AttendanceConfirmation");
    } catch (error) {
        yield put({ type: types.MARK_ATTENDANCE_ERROR, error });
    }
}

function* leaveReview(action) {
    try {
        let userId = yield select(currentUserSelectors.userId);
        let booking = yield select(eventSelectors.relatedBooking);
        let { eventId, chefId, review, ratings } = action.payload;
        yield call(
            EventService.leaveReview,
            userId,
            booking.id,
            eventId,
            chefId,
            review,
            ratings
        );
        yield put({ type: types.LEAVE_REVIEW_SUCCESS });
        yield put({ type: currentUserTypes.GET_CURRENT_BOOKINGS_REQUEST });
        NavigationService.navigate("ReviewConfirmation");
    } catch (error) {
        yield put({ type: types.LEAVE_REVIEW_ERROR, error });
    }
}

export const eventSagas = [
    takeLatest(types.GET_EVENTS_REQUEST, getActiveEventsWorkerSaga),
    takeEvery(types.SELECT_EVENT, getEventDetails),
    takeLatest(types.BOOK_EVENT_REQUEST, bookEventWorkerSaga),
    takeLatest(types.REFUND_BOOKING_REQUEST, refundBookingWorkerSaga),
    takeLatest(types.CANCEL_EVENT_REQUEST, cancelEventWorkerSaga),
    takeLatest(types.CREATE_EVENT_REQUEST, createEventWorkerSaga),
    takeLatest(types.MARK_ATTENDANCE_REQUEST, markAttendanceWorkerSaga),
    takeLatest(types.LEAVE_REVIEW_REQUEST, leaveReview)
];
