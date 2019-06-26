import { takeLatest, call, put, select, all } from "redux-saga/effects";
import { getEventWorkerSaga } from "Homecooked/src/modules/event/sagas";
import types from "./types";
import { UserService } from "Homecooked/src/services/api";
import * as userSelectors from "Homecooked/src/modules/currentUser/selectors";

function* loadNotificationsWorkerSaga(action) {
    try {
        let userId = yield select(userSelectors.userId);
        let userType = action.userType;
        let { data: notifications } = yield call(
            UserService.getNotificationsForUser,
            userId,
            userType
        );

        yield all(
            notifications.map(notification =>
                call(getEventWorkerSaga, { eventId: notification.entityId })
            )
        );

        yield put({
            type: types.GET_NOTIFICATIONS_SUCCESS,
            payload: { notifications }
        });
    } catch (error) {
        yield put({ type: types.GET_NOTIFICATIONS_ERROR, error });
    }
}

export const notificationSagas = [
    takeLatest(types.GET_NOTIFICATIONS_REQUEST, loadNotificationsWorkerSaga)
];
