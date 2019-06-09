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

const BookingService = {
    createBooking
};

export default BookingService;
