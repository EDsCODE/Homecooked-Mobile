import { takeLatest, call, put, fork, all } from "redux-saga/effects";
import { EventService } from "Homecooked/src/services/api";
import types from "./types";

import { getActiveEventsWorkerSaga } from "Homecooked/src/modules/event/sagas";
import {
    getCurrentBookingsWorkerSaga,
    createBookingWorkerSaga
} from "Homecooked/src/modules/booking/sagas";

function* getEventsWorkerSaga(action) {
    try {
        const { data } = yield call(EventService.getEvents);
        if (!data) {
            throw new Error("Could not retrieve events");
        }
        // TODO: get all other data related
        // yield all(data.map(event => call(getBookingsWorkerSaga, event.id)));
        yield put({ type: types.RETRIEVE_EVENTS_SUCCESS, events: data });
    } catch (error) {
        yield put({ type: types.RETRIEVE_EVENTS_ERROR, error });
    }
}

function* getBookingsWorkerSaga(id) {
    try {
        const { data } = yield call(EventService.getBookingByEvent, id);
        // TODO: get all other data related
        yield put({
            type: types.RETRIEVE_BOOKINGS_SUCCESS,
            bookings: {
                [id]: data
            }
        });
    } catch (error) {
        yield put({ type: types.RETRIEVE_BOOKINGS_ERROR, error });
    }
}

function* loadFeedWorkerSaga(action) {
    try {
        // load bookings for user
        yield call(getCurrentBookingsWorkerSaga);
        yield call(getActiveEventsWorkerSaga);
        // load events
        yield put({ type: types.LOAD_FEED_SUCCESS });
    } catch (error) {
        yield put({ type: types.LOAD_FEED_ERROR, error });
    }
}

function* bookEventWorkerSaga(action) {
    try {
        // call create booking saga and get result
        yield call(
            createBookingWorkerSaga,
            action.payload.eventId,
            action.payload.paymentToken
        );
        yield put({ type: types.BOOK_EVENT_SUCCESS });
    } catch (error) {
        yield put({ type: types.BOOK_EVENT_ERROR, error });
    }
}

export const feedSagas = [
    takeLatest(types.RETRIEVE_EVENTS_REQUEST, getEventsWorkerSaga),
    takeLatest(types.LOAD_FEED_REQUEST, loadFeedWorkerSaga),
    takeLatest(types.BOOK_EVENT_REQUEST, bookEventWorkerSaga)
];

// const getKeys = events => {
//     let keys = [];
//     events.forEach(event => {
//         keys.push(event.id);
//     });
//     return keys;
// };
