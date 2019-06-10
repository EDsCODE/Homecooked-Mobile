import { takeLatest, call, put, fork, all } from "redux-saga/effects";
import { EventService } from "Homecooked/src/services/api";
import types from "./types";
import { getUserById } from "Homecooked/src/modules/user/sagas";

export function* getActiveEventsWorkerSaga(action) {
    try {
        const { data } = yield call(EventService.getActiveEvents);
        if (!data) {
            throw new Error("Could not retrieve events");
        }

        let userIds = [];
        data.forEach(event => {
            event.bookings.forEach(booking => {
                userIds.push(booking.userId);
            });
        });

        yield all(userIds.map(userId => call(getUserById, { userId })));

        yield put({ type: types.GET_ACTIVE_EVENTS_SUCCESS, events: data });
    } catch (error) {
        yield put({ type: types.GET_ACTIVE_EVENTS_ERROR, error });
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

export const eventSagas = [
    takeLatest(types.GET_ACTIVE_EVENTS_REQUEST, getActiveEventsWorkerSaga)
];
