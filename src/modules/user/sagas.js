import { takeLatest, call, put, select } from "redux-saga/effects";
import types from "./types";
import { ImageService, UserService } from "Homecooked/src/services/api";
import * as selectors from "./selectors";

function* uploadImageWorkerSaga(action) {
    try {
        // upload image
        let { image } = action.payload;
        let { data: key } = yield call(ImageService.uploadImage, image);
        yield put({ type: types.UPLOAD_USER_IMAGE_SUCCESS, payload: { key } });

        // update user image link
        yield put({
            type: types.UPDATE_USER_REQUEST,
            payload: { profileImageURL: key }
        });
    } catch (error) {
        yield put({ type: types.UPLOAD_USER_IMAGE_ERROR, error });
    }
}

function* updateUserWorkerSaga(action) {
    try {
        let userInput = action.payload;
        let userId = yield select(selectors.userId);

        let { message } = yield call(UserService.updateUser, userId, userInput);
        yield put({
            type: types.UPDATE_USER_SUCCESS,
            payload: { ...userInput }
        });
    } catch (error) {
        yield put({ type: types.UPDATE_USER_ERROR, error });
    }
}

function* getBokkingsForUserWorkerSaga(action) {
    try {
        let userId = yield select(selectors.userId);
        let { message, data } = yield call(
            UserService.getBookingsForUser,
            userId
        );
        yield put({
            type: types.GET_BOOKINGS_SUCCESS,
            payload: data
        });
    } catch (error) {
        yield put({ type: types.GET_BOOKINGS_ERROR, error });
    }
}

export const userSagas = [
    takeLatest(types.UPLOAD_USER_IMAGE_REQUEST, uploadImageWorkerSaga),
    takeLatest(types.UPDATE_USER_REQUEST, updateUserWorkerSaga),
    takeLatest(types.GET_BOOKINGS_REQUEST, getBokkingsForUserWorkerSaga)
];
