import { authSagas } from "./auth/sagas";
import { all } from "redux-saga/effects";
// import feedSaga from "./feed/sagas";
// import historySaga from "./history/sagas";
// import notificationSaga from "./notifications/sagas";
import { hostSagas } from "./host/sagas";
import { userSagas } from "./user/sagas";

export default function* rootSaga() {
    yield all([...authSagas, ...hostSagas, ...userSagas]);
}
