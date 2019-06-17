import { takeLatest, call, put, select } from "redux-saga/effects";
import types from "./types";
import { ImageService, UserService } from "Homecooked/src/services/api";
import * as selectors from "./selectors";

function* getAvatarWorkerSaga(action) {
    try {
        let currentUser = yield select(selectors.currentUser);
        if (!currentUser.profileImageUrl) {
            throw new Error("No profile image key");
        }
        let { data: url } = yield call(
            ImageService.getImage,
            currentUser.profileImageUrl
        );
        yield put({
            type: types.GET_AVATAR_SUCCESS,
            payload: {
                profileImageSignedUrl: url
            }
        });
    } catch (error) {
        yield put({ type: types.GET_AVATAR_ERROR, error });
    }
}

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
        yield put({ type: types.GET_AVATAR_REQUEST });
    } catch (error) {
        yield put({ type: types.UPDATE_USER_ERROR, error });
    }
}

function* getBookingsForUserWorkerSaga(action) {
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

function* savePaymentWorkerSaga(action) {
    try {
        let currentUser = yield select(selectors.currentUser);
        let { id, stripeCustomerId, email } = currentUser;
        let { token } = action.payload;
        if (stripeCustomerId) {
            let { message } = yield call(
                UserService.updatePaymentDetails,
                id,
                token,
                stripeCustomerId
            );
            yield put({
                type: types.SAVE_PAYMENT_SUCCESS
            });
        } else {
            let { message, data } = yield call(
                UserService.savePaymentDetails,
                id,
                token,
                email
            );
            yield put({
                type: types.SAVE_PAYMENT_SUCCESS,
                payload: {
                    stripeCustomerId: data
                }
            });
        }
    } catch (error) {
        yield put({ type: types.SAVE_PAYMENT_ERROR, error });
    }
}

export const userSagas = [
    takeLatest(types.UPLOAD_USER_IMAGE_REQUEST, uploadImageWorkerSaga),
    takeLatest(types.UPDATE_USER_REQUEST, updateUserWorkerSaga),
    takeLatest(types.GET_BOOKINGS_REQUEST, getBookingsForUserWorkerSaga),
    takeLatest(types.SAVE_PAYMENT_REQUEST, savePaymentWorkerSaga),
    takeLatest(types.GET_AVATAR_REQUEST, getAvatarWorkerSaga)
];
