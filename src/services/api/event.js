import request from "Homecooked/src/utils/request";
import qs from "qs";

const getEvents = () => {
    return request({
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        url: `/event`
    });
};

const getActiveEvents = () => {
    return request({
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        url: `/event`,
        params: {
            group: "active"
        }
    });
};

const getBookingByEvent = id => {
    return request({
        method: "GET",
        url: `/event/${id}/bookings`
    });
};

const EventService = {
    getEvents,
    getBookingByEvent,
    getActiveEvents
};

export default EventService;
