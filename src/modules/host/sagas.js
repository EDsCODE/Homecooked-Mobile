import { takeLatest, call, put, select } from "redux-saga/effects";
import { HostService, ImageService } from "Homecooked/src/services/api";
import types from "./types";
import NavigationService from "Homecooked/src/utils/NavigationService";
import * as userSelectors from "Homecooked/src/modules/currentUser/selectors";
import {
    getEventsByChefIdWorkerSaga,
    updateEventStatusSaga
} from "Homecooked/src/modules/event/sagas";

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
        let userId = yield select(userSelectors.userId);
        const { data } = yield call(HostService.getChefByUserId, userId);
        yield put({ type: types.GET_CHEF_SUCCESS, payload: { chef: data } });
    } catch (error) {
        yield put({ type: types.GET_CHEF_ERROR, error });
    }
}

function* loadHostingEventsSaga(action) {
    try {
        yield call(getEventsByChefIdWorkerSaga);
        yield put({ type: types.LOAD_HOSTING_EVENTS_SUCCESS });
    } catch (error) {
        yield put({ type: types.LOAD_HOSTING_EVENTS_ERROR, error });
    }
}

function* cancelEventWorkerSaga(action) {
    try {
        yield call(updateEventStatusSaga, action.eventId, "CAN");
        yield put({ type: types.CANCEL_EVENT_SUCCESS });
    } catch (error) {
        yield put({ type: types.CANCEL_EVENT_ERROR, error });
    }
}

export const hostSagas = [
    takeLatest(types.CREATE_APPLICATION_REQUEST, createApplicationWorkerSaga),
    takeLatest(types.GET_CHEF_REQUEST, getChefWorkerSaga),
    takeLatest(types.LOAD_HOSTING_EVENTS_REQUEST, loadHostingEventsSaga),
    takeLatest(types.CANCEL_EVENT_REQUEST, cancelEventWorkerSaga)
];
