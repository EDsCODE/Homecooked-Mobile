// get events user is not involved in
import { createSelector } from "reselect";

const getCurrentBookings = state => state.currentBookings.byId;
const getEvents = state => state.events.byId;
const getUsers = state => state.users.byId;

export const getActiveEvents = createSelector(
    [getEvents, getCurrentBookings, getUsers],
    (events, bookings, users) => {
        // check if bookings overlap with currentUser Bookings
        let currentBookingsArray = Object.values(bookings);
        let eventsArray = Object.values(events);

        // remove events that user is a part of
        eventsArray = eventsArray.filter(event => {
            for (let x = 0; x < currentBookingsArray.length; x++) {
                if (event.id == currentBookingsArray[x].eventId) {
                    return false;
                }
            }
            return true;
        });
        eventsArray.forEach((event, i) => {
            let bookings = event.bookings.filter(
                booking => booking.status == "CNF"
            );
            bookings.forEach((booking, j) => {
                bookings[j].user = users[booking.userId];
            });
            eventsArray[i].bookings = bookings;
        });
        return eventsArray;
    }
);
