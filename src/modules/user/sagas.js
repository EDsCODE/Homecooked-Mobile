import { takeLatest, call, put, select, all } from "redux-saga/effects";
import { UserService } from "Homecooked/src/services/api";

import types from "./types";

export function* getUserById(action) {
    try {
        const { data } = yield call(UserService.getUserById, action.userId);
        yield put({ type: types.GET_USER_SUCCESS, user: data });
    } catch (error) {
        yield put({ type: types.GET_USER_ERROR, error });
    }
}

export function* getUsersOfEventSaga(events) {
    try {
        let userIds = [];
        console.log(events);
        events.forEach(event => {
            event.bookings.forEach(booking => {
                userIds.push(booking.userId);
            });
        });
        yield all(userIds.map(userId => call(getUserById, { userId })));
    } catch (error) {
        yield put({ type: types.GET_USER_ERROR, error });
    }
}
