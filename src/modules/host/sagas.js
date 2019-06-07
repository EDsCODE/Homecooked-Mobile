import { takeLatest, call, put } from "redux-saga/effects";
import { HostService, ImageService } from "Homecooked/src/services/api";
import types from "./types";
import NavigationService from "Homecooked/src/utils/NavigationService";

function* createApplicationWorkerSaga(action) {
    try {
        let {
            userId,
            address,
            lat,
            lng,
            images,
            reason,
            experience
        } = action.payload;
        let imageKeys = { 0: null, 1: null, 2: null, 3: null };
        for (let i = 0; i <= 4; i++) {
            if (images[i] && images[i].data) {
                let { data } = yield call(ImageService.uploadImage, images[i]);
                imageKeys[i] = data;
            }
        }

        console.log(imageKeys);
        const { message } = yield call(
            HostService.createApplication,
            userId,
            address,
            lat,
            lng,
            reason,
            experience,
            imageKeys
        );

        yield put({ type: types.CREATE_APPLICATION_SUCCESS });

        // TODO: call get chef
        yield put({ type: types.GET_CHEF_REQUEST, payload: { userId } });

        // TODO: return to settings main
        NavigationService.navigate("Finish");
    } catch (error) {
        yield put({ type: types.CREATE_APPLICATION_ERROR, error });
    }
}

function* getChefWorkerSaga(action) {
    try {
        let { userId } = action.payload;
        const { data } = yield call(HostService.getChef, userId);
        yield put({ type: types.GET_CHEF_SUCCESS, payload: { chef: data } });
    } catch (error) {
        yield put({ type: types.GET_CHEF_ERROR, error });
    }
}

export const hostSagas = [
    takeLatest(types.CREATE_APPLICATION_REQUEST, createApplicationWorkerSaga),
    takeLatest(types.GET_CHEF_REQUEST, getChefWorkerSaga)
];
