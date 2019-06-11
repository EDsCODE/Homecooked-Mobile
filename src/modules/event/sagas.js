import { takeLatest, call, put, fork, all, select } from "redux-saga/effects";
import { EventService } from "Homecooked/src/services/api";
import types from "./types";
import { getUsersOfEventSaga } from "Homecooked/src/modules/user/sagas";
import * as hostSelectors from "Homecooked/src/modules/host/selectors";

export function* getActiveEventsWorkerSaga(action) {
    try {
        const { data } = yield call(EventService.getActiveEvents);
        if (!data) {
            throw new Error("Could not retrieve events");
        }

        yield call(getUsersOfEventSaga, data);

        yield put({ type: types.GET_EVENTS_SUCCESS, events: data });
    } catch (error) {
        yield put({ type: types.GET_EVENTS_ERROR, error });
    }
}

export function* getEventWorkerSaga(action) {
    try {
        const { data } = yield call(EventService.getEventById, action.eventId);
        yield call(getUsersOfEventSaga, [data]);
        yield put({ type: types.GET_EVENT_SUCCESS, event: data });
    } catch (error) {
        yield put({ type: types.GET_EVENT_ERROR, error });
    }
}

export function* getEventsByChefIdWorkerSaga(action) {
    try {
        let chefId = yield select(hostSelectors.chefId);
        const { data } = yield call(EventService.getEventsByChefId, chefId);

        yield call(getUsersOfEventSaga, data);

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

export const eventSagas = [
    takeLatest(types.GET_EVENTS_REQUEST, getActiveEventsWorkerSaga)
];
