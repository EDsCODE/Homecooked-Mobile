import { takeLatest, call, put, fork, all } from "redux-saga/effects";
import { EventService } from "Homecooked/src/services/api";
import types from "./types";

export function* getActiveEventsWorkerSaga(action) {
    try {
        const { data } = yield call(EventService.getActiveEvents);
        if (!data) {
            throw new Error("Could not retrieve events");
        }
        yield put({ type: types.GET_ACTIVE_EVENTS_SUCCESS, events: data });
    } catch (error) {
        yield put({ type: types.GET_ACTIVE_EVENTS_ERROR, error });
    }
}

export const eventSagas = [
    takeLatest(types.GET_ACTIVE_EVENTS_REQUEST, getActiveEventsWorkerSaga)
];
