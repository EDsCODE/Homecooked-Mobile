import { takeLatest, call, put } from "redux-saga/effects";
import { AuthService } from "Homecooked/src/services/api";
import types from "./types";
import NavigationService from "Homecooked/src/utils/NavigationService";

// ref: https://hackernoon.com/redux-saga-tutorial-for-beginners-and-dog-lovers-aa69a17db645

// worker saga: makes the api call when watcher saga sees the action
function* loginWorkerSaga(action) {
    try {
        let { email, password } = action.payload;
        const { accessToken, user, message, refreshToken } = yield call(
            AuthService.login,
            email,
            password
        );
        console.log(message);
        // dispatch a success action to the store with the new accesstoken
        yield put({ type: types.LOGIN_SUCCESS, accessToken });

        // navigate to main
        NavigationService.navigate("Main");
    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: types.LOGIN_ERROR, error });
    }
}

function* registerWorkerSage(action) {
    try {
        let { email, password, firstName } = action.payload;
        const payload = yield call(
            AuthService.register,
            email,
            password,
            firstName
        );
        let { accessToken, user, message, refreshToken } = payload;
        console.log(payload);

        // TODO: store user and refresh token

        // dispatch a success action to the store with the new access
        yield put({ type: types.SIGNUP_SUCCESS, accessToken });

        // navigate to main
        NavigationService.navigate("Onboarding");
    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: types.SIGNUP_ERROR, error });
    }
}

export const authSagas = [
    takeLatest(types.LOGIN_REQUEST, loginWorkerSaga),
    takeLatest(types.SIGNUP_REQUEST, registerWorkerSage)
];
