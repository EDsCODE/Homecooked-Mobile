import { takeLatest, call, put } from "redux-saga/effects";
import { AuthService } from "Homecooked/src/services/api";
import types from "./types";
import { userTypes } from "../types";
import NavigationService from "Homecooked/src/utils/NavigationService";
import SInfo from "react-native-sensitive-info";

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

        console.log(user);
        // dispatch a success action to the store with the new accesstoken
        SInfo.setItem("email", user.email, {});
        SInfo.setItem("refreshToken", refreshToken, {});

        yield put({ type: types.LOGIN_SUCCESS, accessToken });
        yield put({
            type: userTypes.UPDATE_USER_SUCCESS,
            payload: { ...user }
        });

        // navigate to main
        NavigationService.navigate("Main");
    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: types.LOGIN_ERROR, error });
    }
}

function* registerWorkerSaga(action) {
    try {
        let { email, password, firstName } = action.payload;
        const payload = yield call(
            AuthService.register,
            email,
            password,
            firstName
        );
        let { accessToken, user, message, refreshToken } = payload;

        SInfo.setItem("email", user.email, {});
        SInfo.setItem("refreshToken", refreshToken, {});

        // dispatch a success action to the store with the new access
        yield put({ type: types.SIGNUP_SUCCESS, accessToken });
        yield put({
            type: userTypes.UPDATE_USER_SUCCESS,
            payload: { ...user }
        });

        // navigate to main
        NavigationService.navigate("Onboarding");
    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: types.SIGNUP_ERROR, error });
    }
}

function* logoutWorkerSaga(action) {
    try {
        let refreshToken = yield call(SInfo.getItem, "refreshToken", {});
        console.log(refreshToken);
        yield call(AuthService.signout, refreshToken);
        yield put({ type: types.SIGNOUT_SUCCESS });
        SInfo.setItem("email", "", {});
        SInfo.setItem("refreshToken", "", {});
    } catch (error) {
        yield put({ type: types.SIGNOUT_ERROR, error });
    }
}

function* refreshTokenWorkerSaga(action) {
    try {
        let { email, refreshToken } = action.payload;
        const { accessToken, user } = yield call(
            AuthService.refreshToken,
            email,
            refreshToken
        );

        yield put({ type: types.LOGIN_SUCCESS, accessToken });
        yield put({
            type: userTypes.UPDATE_USER_SUCCESS,
            payload: { ...user }
        });
        NavigationService.navigate("Main");
    } catch (error) {
        SInfo.setItem("email", "", {});
        SInfo.setItem("refreshToken", "", {});
        yield put({ type: types.SIGNOUT_REQUEST, error });
        NavigationService.navigate("Auth");

        yield put({ type: types.LOGIN_ERROR, error });
    }
}

export const authSagas = [
    takeLatest(types.LOGIN_REQUEST, loginWorkerSaga),
    takeLatest(types.SIGNUP_REQUEST, registerWorkerSaga),
    takeLatest(types.REFRESH_TOKEN_REQUEST, refreshTokenWorkerSaga),
    takeLatest(types.SIGNOUT_REQUEST, logoutWorkerSaga)
];
