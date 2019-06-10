import { takeLatest, call, put, select } from "redux-saga/effects";
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
