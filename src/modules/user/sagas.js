import { takeLatest, call, put } from "redux-saga/effects";
import types from "./types";
import { ImageService, UserService } from "Homecooked/src/services/api";

function* uploadImageWorkerSaga(action) {
    try {
        let { image } = action.payload;
        let { data: key } = yield call(ImageService.uploadImage, image);
        yield put({ type: types.UPLOAD_USER_IMAGE_SUCCESS, payload: { key } });
    } catch (error) {
        yield put({ type: types.UPLOAD_USER_IMAGE_ERROR, error });
    }
}

function* updateUserWorkerSaga(action) {
    try {
        let { userInput } = action.payload;
        let { message } = yield call(UserService.updateUser, userInput);
        yield put({ type: types.UPDATE_USER_SUCCESS, payload: { userInput } });
    } catch (error) {
        yield put({ type: types.UPDATE_USER_ERROR, error });
    }
}

export const userSagas = [
    takeLatest(types.UPLOAD_USER_IMAGE_REQUEST, uploadImageWorkerSaga),
    takeLatest(types.UPDATE_USER_REQUEST, updateUserWorkerSaga)
];
