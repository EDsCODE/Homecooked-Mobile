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

const getEventById = eventId => {
    return request({
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        url: `/event/` + eventId
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

const getEventsByChefId = chefId => {
    return request({
        method: "GET",
        url: `/chef/${chefId}/events`
    });
};

const cancelEvent = id => {
    return request({
        method: "PATCH",
        url: `/event/${id}/cancel`
    });
};

const EventService = {
    getEvents,
    getBookingByEvent,
    getActiveEvents,
    getEventById,
    getEventsByChefId,
    cancelEvent
};

export default EventService;
