import { takeLatest, call, put, fork, all, select } from "redux-saga/effects";
import {
    UserService,
    BookingService,
    EventService
} from "Homecooked/src/services/api";
import types from "./types";

import { getUserById } from "Homecooked/src/modules/user/sagas";

import * as userSelectors from "Homecooked/src/modules/currentUser/selectors";

export function* getBookingsForEvent(eventId) {
    try {
        const { data: bookings } = yield call(
            EventService.getBookingByEvent,
            eventId
        );

        yield all(bookings.map(booking => call(getUserById, booking.userId)));

        yield put({
            type: types.GET_BOOKINGS_BY_EVENT_SUCCESS,
            payload: {
                eventId,
                bookings
            }
        });
    } catch (error) {
        yield put({ type: types.GET_BOOKINGS_ERROR, error });
    }
}

export function* createBookingWorkerSaga(eventId, paymentToken) {
    try {
        let userId = yield select(userSelectors.userId);
        const { data } = yield call(
            BookingService.createBooking,
            userId,
            eventId,
            paymentToken
        );
        yield put({ type: types.CREATE_BOOKING_SUCCESS, booking: data });
    } catch (error) {
        yield put({ type: types.CREATE_BOOKING_ERROR, error });
    }
}

export function* updateBookingStatusSaga(bookingId, status) {
    try {
        let booking;
        if (status == "REF") {
            let { data } = yield call(BookingService.refundBooking, bookingId);
            booking = data;
        } else {
            throw new Error("invalid status");
        }
        yield put({ type: types.UPDATE_BOOKING_STATUS_SUCCESS, booking });
    } catch (error) {
        yield put({ type: types.UPDATE_BOOKING_STATUS_ERROR, error });
    }
}
