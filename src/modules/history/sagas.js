import { takeLatest, call, put, select, all } from "redux-saga/effects";
import { getEventWorkerSaga } from "Homecooked/src/modules/event/sagas";
import { updateBookingStatusSaga } from "Homecooked/src/modules/booking/sagas";
import { getCurrentBookingsWorkerSaga } from "Homecooked/src/modules/currentUser/sagas";
import * as bookingSelectors from "Homecooked/src/modules/booking/selectors";
import types from "./types";

import { BookingService } from "Homecooked/src/services/api";

function* loadHistoryWorkerSaga(action) {
    try {
        yield call(getCurrentBookingsWorkerSaga);

        let userBookings = yield select(bookingSelectors.getBookingsForUser);

        // retrieve events related to bookings
        yield all(
            userBookings.map(booking =>
                call(getEventWorkerSaga, { eventId: booking.eventId })
            )
        );

        yield put({ type: types.LOAD_HISTORY_SUCCESS });
    } catch (error) {
        yield put({ type: types.LOAD_HISTORY_ERROR, error });
    }
}

export const historySagas = [
    takeLatest(types.LOAD_HISTORY_REQUEST, loadHistoryWorkerSaga)
];
