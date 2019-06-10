// get events upcoming events for user
// get events past
import { createSelector } from "reselect";

const getBookings = state => state.currentBookings.byId;
const getEvents = state => state.events.byId;

export const getUpcomingEvents = createSelector(
    [getEvents, getBookings],
    (events, bookings) => {
        let currentBookingsArray = Object.values(bookings);
        let upcomingEvents = [];
        currentBookingsArray.forEach(booking => {
            if (booking.status == "CNF") {
                upcomingEvents.push({
                    ...events[booking.eventId],
                    userBooking: booking
                });
            }
        });
        return upcomingEvents;
    }
);

export const getPastEvents = createSelector(
    [getEvents, getBookings],
    (events, bookings) => {
        let currentBookingsArray = Object.values(bookings);
        let pastEvents = [];
        currentBookingsArray.forEach(booking => {
            pastEvents.push({
                ...events[booking.eventId],
                userBooking: booking
            });
        });
        return pastEvents;
    }
);

export const orderBy = {};
