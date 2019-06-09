// get events user is not involved in
import { createSelector } from "reselect";

const getBookings = state => state.currentBookings.byId;
const getEvents = state => state.events.byId;

export const getActiveEvents = createSelector(
    [getEvents, getBookings],
    (events, bookings) => {
        // check if bookings overlap with currentUser Bookings
        let currentBookingsArray = Object.values(bookings);
        let eventsArray = Object.values(events);

        eventsArray = eventsArray.filter(event => {
            for (let x = 0; x < currentBookingsArray.length; x++) {
                if (event.id == currentBookingsArray[x].eventId) {
                    return false;
                }
            }
            return true;
        });
        return eventsArray;
    }
);
