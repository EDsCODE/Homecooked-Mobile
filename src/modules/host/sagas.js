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
        let { applicationInput, images } = action.payload;
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

        applicationInput.chefId = chefId;
        yield call(HostService.createApplication, userId, applicationInput);

        let result = yield all(
            Object.keys(imageKeys).map(type => {
                if (imageKeys[type]) {
                    if (type == 0) {
                        return call(
                            HostService.createChefMedia,
                            chefId,
                            imageKeys[type],
                            "AVATAR"
                        );
                    } else {
                        return call(
                            HostService.createChefMedia,
                            chefId,
                            imageKeys[type],
                            "EVENT"
                        );
                    }
                }
            })
        );
        yield put({
            type: types.UPDATE_HOST_REQUEST,
            payload: {
                profileImageUrl: imageKeys[1]
            }
        });
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
        yield put({
            type: types.GET_CHEF_SUCCESS,
            payload: { chef, preferences }
        });
        yield put({ type: types.GET_HOST_AVATAR_REQUEST });
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

function* uploadImageWorkerSaga(action) {
    try {
        let { image } = action.payload;
        let { data: key } = yield call(ImageService.uploadImage, image);
        yield put({ type: types.UPLOAD_HOST_IMAGE_SUCCESS, payload: { key } });
        yield put({
            type: types.UPDATE_HOST_REQUEST,
            payload: {
                profileImageUrl: key
            }
        });
    } catch (error) {
        yield put({ type: types.UPLOAD_HOST_IMAGE_ERROR, error });
    }
}

function* updateHostWorkerSaga(action) {
    try {
        let hostInput = action.payload;
        let chefId = yield select(hostSelectors.chefId);
        yield call(HostService.updateHost, chefId, hostInput);
        yield put({
            type: types.UPDATE_HOST_SUCCESS,
            payload: {
                ...hostInput
            }
        });
        yield put({ type: types.GET_HOST_AVATAR_REQUEST });
    } catch (error) {
        yield put({ type: types.UPDATE_HOST_ERROR, error });
    }
}

function* getAvatarWorkerSaga(action) {
    try {
        let host = yield select(hostSelectors.host);
        if (!host.profileImageUrl) {
            throw "No profile image key";
        }
        let { data: url } = yield call(
            ImageService.getImage,
            host.profileImageUrl
        );
        yield put({
            type: types.GET_HOST_AVATAR_SUCCESS,
            payload: {
                profileImageSignedUrl: url
            }
        });
    } catch (error) {
        yield put({ type: types.GET_HOST_AVATAR_ERROR, error });
    }
}

export const hostSagas = [
    takeLatest(types.CREATE_APPLICATION_REQUEST, createApplicationWorkerSaga),
    takeLatest(types.GET_CHEF_REQUEST, getChefWorkerSaga),
    takeLatest(types.UPDATE_HOST_REQUEST, updateHostWorkerSaga),
    takeLatest(types.LOAD_HOSTING_EVENTS_REQUEST, loadHostingEventsSaga),
    takeLatest(types.POST_EVENT_REQUEST, postEventWorkerSaga),
    takeLatest(types.UPLOAD_HOST_IMAGE_REQUEST, uploadImageWorkerSaga),
    takeLatest(types.GET_HOST_AVATAR_REQUEST, getAvatarWorkerSaga)
];
