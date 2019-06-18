import { takeLatest, call, put, select, all } from "redux-saga/effects";
import { UserService, ImageService } from "Homecooked/src/services/api";

import types from "./types";

export function* getUserById(userId) {
    try {
        const { data: user } = yield call(UserService.getUserById, userId);
        if (user["profileImageURL"]) {
            let { data: url } = yield call(
                ImageService.getImage,
                user["profileImageURL"]
            );
            user["profileImageSignedUrl"] = url;
        }
        yield put({ type: types.GET_USER_SUCCESS, user });
    } catch (error) {
        yield put({ type: types.GET_USER_ERROR, error });
    }
}

export function* getUsersOfEventSaga(events) {
    try {
        let userIds = [];
        events.forEach(event => {
            event.bookings.forEach(booking => {
                userIds.push(booking.userId);
            });
        });
        yield all(userIds.map(userId => call(getUserById, userId)));
    } catch (error) {
        yield put({ type: types.GET_USER_ERROR, error });
    }
}
