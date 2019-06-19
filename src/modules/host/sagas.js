import { takeLatest, call, put, select, all } from "redux-saga/effects";
import {
    HostService,
    ImageService,
    EventService
} from "Homecooked/src/services/api";
import types from "./types";
import NavigationService from "Homecooked/src/utils/NavigationService";
import * as userSelectors from "Homecooked/src/modules/currentUser/selectors";
import {
    getEventsByChefIdWorkerSaga,
    createEventWorkerSaga
} from "Homecooked/src/modules/event/sagas";

import * as currentUserSelectors from "Homecooked/src/modules/currentUser/selectors";
import * as hostSelectors from "Homecooked/src/modules/host/selectors";

function* createApplicationWorkerSaga(action) {
    try {
        let { address, lat, lng, images, reason, experience } = action.payload;
        let imageKeys = { 1: null, 2: null, 3: null, 4: null };
        for (let i = 0; i <= 3; i++) {
            if (images[i] && images[i].data) {
                let { data } = yield call(ImageService.uploadImage, images[i]);

                imageKeys[i + 1] = data;
            }
        }

        let chefId = yield select(hostSelectors.chefId);
        let userId = yield select(currentUserSelectors.userId);
        // if no chefId create a chef id
        if (!chefId) {
            let { data } = yield call(HostService.createChef, userId);
            chefId = data;
        }

        const { data } = yield call(
            HostService.createApplication,
            chefId,
            address,
            lat,
            lng,
            reason,
            experience
        );

        yield all(
            Object.keys(imageKeys).map(type => {
                if (imageKeys[type]) {
                    return call(
                        HostService.createChefMedia,
                        chefId,
                        imageKeys[type],
                        type
                    );
                }
            })
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
        const { data: chef } = yield call(HostService.getChefByUserId, userId);
        const { data: preferences } = yield call(
            EventService.getEventSettingsByType,
            chef.type
        );
        let medias = yield all(
            chef.media.map(media => {
                return call(getChefMedia, media);
            })
        );
        yield put({
            type: types.GET_CHEF_SUCCESS,
            payload: { chef, preferences, media: medias }
        });
    } catch (error) {
        yield put({ type: types.GET_CHEF_ERROR, error });
    }
}

function* getChefMedia(item) {
    let { data: url } = yield call(ImageService.getImage, item.key);

    return {
        ...item,
        url
    };
}

function* loadHostingEventsSaga(action) {
    try {
        yield call(getEventsByChefIdWorkerSaga);
        yield put({ type: types.LOAD_HOSTING_EVENTS_SUCCESS });
    } catch (error) {
        yield put({ type: types.LOAD_HOSTING_EVENTS_ERROR, error });
    }
}

function* postEventWorkerSaga(action) {
    try {
        let chefId = yield select(hostSelectors.chefId);
        let payload = {
            ...action.payload,
            chefId
        };

        yield call(createEventWorkerSaga, payload);
        yield put({ type: types.POST_EVENT_SUCCESS });
        NavigationService.navigate("HostTablesMain");
    } catch (error) {
        yield put({ type: types.POST_EVENT_ERROR, error });
    }
}

export const hostSagas = [
    takeLatest(types.CREATE_APPLICATION_REQUEST, createApplicationWorkerSaga),
    takeLatest(types.GET_CHEF_REQUEST, getChefWorkerSaga),
    takeLatest(types.LOAD_HOSTING_EVENTS_REQUEST, loadHostingEventsSaga),
    takeLatest(types.POST_EVENT_REQUEST, postEventWorkerSaga)
];
