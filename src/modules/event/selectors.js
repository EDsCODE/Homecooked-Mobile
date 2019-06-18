import { createSelector } from "reselect";
import { EventViewTypes } from "Homecooked/src/types/";

export const selectedEventId = state => state.events.selectedEvent;

// export const getEvent = createSelector(
//     [getEvents, getBookings, getUsers, getSelectedEvent, getCurrentDetails],
//     (events, bookingsByEvent, users, selectedEventId, details) => {
//         let event = events[selectedEventId];
//         if (details.loading) {
//             return {
//                 event,
//                 ...details
//             };
//         }

//         let bookings = bookingsByEvent[selectedEventId];
//         bookings = bookings.forEach((booking, index) => {
//             booking.user = users[booking.userId];
//         });
//         event.bookings = bookings;
//         return {
//             event,
//             ...details
//         };
//     }
// );

// export const getEvent = state => {
//     let eventsById = state.events.byId;
//     let bookingsByEvent = state.bookings.byEvent;
//     let usersById = state.users.byId;
//     let details = state.events;
//     if (state.events.loading) {
//         return {
//             loading: true
//         };
//     } else {
//         return {
//             loading: false
//         };
//     }
//     return {
//         loading: state.events.loading
//     };
// };

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
        bookings.forEach((booking, index) => {
            bookings[index].user = usersById[booking.userId];
        });
        event.bookings = bookings;
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
