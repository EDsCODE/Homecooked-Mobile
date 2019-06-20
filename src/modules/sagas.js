import { authSagas } from "./auth/sagas";
import { all } from "redux-saga/effects";
import { feedSagas } from "./feed/sagas";
import { eventSagas } from "./event/sagas";
import { historySagas } from "./history/sagas";
import { notificationSagas } from "./notification/sagas";
import { hostSagas } from "./host/sagas";
import { userSagas } from "./currentUser/sagas";

export default function* rootSaga() {
    yield all([
        ...authSagas,
        ...hostSagas,
        ...userSagas,
        ...feedSagas,
        ...eventSagas,
        ...historySagas,
        ...notificationSagas
    ]);
}
