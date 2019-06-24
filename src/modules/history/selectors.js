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
        console.log(upcomingEvents);
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
                event.mode = EventViewTypes.HISTORY_PAST;
                pastEvents.push({
                    ...event,
                    userBooking: booking
                });
            }
        });

        // pastEvents.forEach((event, i) => {
        //     let bookings = event.bookings.filter(
        //         booking => booking.status == "CNF"
        //     );
        //     bookings.forEach((booking, j) => {
        //         bookings[j].user = users[booking.userId];
        //     });
        //     pastEvents[i].bookings = bookings;
        // });

        return pastEvents;
    }
);
