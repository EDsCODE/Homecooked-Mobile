import { createSelector } from "reselect";
import { EventViewTypes } from "Homecooked/src/types/";
import moment from "moment";

export const selectedEventId = state => state.events.selectedEvent;
export const eventForm = state => state.events.eventForm;
export const relatedBooking = state => state.events.relatedBooking;

export const getEvent = state => {
    let eventsById = state.events.byId;
    let bookingsByEvent = state.bookings.byEvent;
    let usersById = state.users.byId;
    let details = state.events;
    let {
        selectedEvent,
        mode,
        parentRoute,
        relatedBooking,
        loading,
        preview
    } = details;
    let event = eventsById[details.selectedEvent];
    if (mode == EventViewTypes.PREVIEW) {
        return {
            event: preview,
            mode,
            relatedBooking,
            parentRoute,
            loading
        };
    }
    if (details.loading) {
        return {
            event,
            mode,
            relatedBooking,
            parentRoute,
            loading
        };
    } else {
        let bookings = bookingsByEvent[selectedEvent];
        let users = [];
        bookings.forEach((booking, index) => {
            if (booking.status == "CNF") {
                users.push(usersById[booking.userId]);
            }
        });
        event.users = users;
        event.chef.user = usersById[event.chef.userId];
        console.log(event);
        return {
            event,
            mode,
            relatedBooking,
            parentRoute,
            loading
        };
    }
};
