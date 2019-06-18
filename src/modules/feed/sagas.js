import { takeLatest, call, put, fork, all } from "redux-saga/effects";
import { EventService } from "Homecooked/src/services/api";
import types from "./types";

import { getActiveEventsWorkerSaga } from "Homecooked/src/modules/event/sagas";
import { getCurrentBookingsWorkerSaga } from "Homecooked/src/modules/currentUser/sagas";

import { createBookingWorkerSaga } from "Homecooked/src/modules/booking/sagas";

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
