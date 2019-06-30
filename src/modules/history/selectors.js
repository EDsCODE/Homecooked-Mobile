// get events upcoming events for user
// get events past
import { createSelector } from "reselect";
import { EventViewTypes } from "Homecooked/src/types";

const getBookings = state => state.currentUser.bookings;
const getEvents = state => state.events.byId;
const getUsers = state => state.users.byId;

export const orderEventsByDateEarliest = events => {
    let sorted = events.sort((a, b) => {
        return new Date(a.startTime) - new Date(b.startTime);
    });
    return sorted;
};

export const orderEventsByDateLatest = events => {
    let sorted = events.sort((a, b) => {
        return new Date(b.startTime) - new Date(a.startTime);
    });
    return sorted;
};

export const getUpcomingEvents = createSelector(
    [getEvents, getBookings, getUsers],
    (events, bookings, users) => {
        let currentBookingsArray = Object.values(bookings);
        let upcomingEvents = [];
        currentBookingsArray.forEach(booking => {
            if (booking.status == "CNF" && events[booking.eventId]) {
                let event = Object.assign({}, events[booking.eventId]);
                event.mode = EventViewTypes.HISTORY_UPCOMING;

                upcomingEvents.push({
                    ...event,
                    userBooking: booking
                });
            }
        });
        return upcomingEvents;
    }
);

export const getPastEvents = createSelector(
    [getEvents, getBookings, getUsers],
    (events, bookings, users) => {
        let currentBookingsArray = Object.values(bookings);
        let pastEvents = [];
        currentBookingsArray.forEach(booking => {
            if (events[booking.eventId]) {
                let event = Object.assign({}, events[booking.eventId]);
                if (
                    booking.status != "CNF" ||
                    (event.status != "OPN" && event.status != "FUL")
                ) {
                    if (booking.status == "ATT") {
                        event.mode = EventViewTypes.HISTORY_REVIEW;
                    } else {
                        event.mode = EventViewTypes.HISTORY_PAST;
                    }
                    pastEvents.push({
                        ...event,
                        userBooking: booking
                    });
                }
            }
        });
        return pastEvents;
    }
);
