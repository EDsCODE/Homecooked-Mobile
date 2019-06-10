import request from "Homecooked/src/utils/request";

const createBooking = (userId, eventId, paymentToken) => {
    return request({
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        url: `/booking`,
        data: {
            userId,
            eventId,
            paymentToken
        }
    });
};

const refundBooking = bookingId => {
    return request({
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        url: `/booking/${bookingId}/refund`
    });
};

const BookingService = {
    createBooking,
    refundBooking
};

export default BookingService;
