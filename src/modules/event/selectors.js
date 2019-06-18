import { createSelector } from "reselect";

const getBookings = state => state.bookings.byEvent;
const getEvents = state => state.events.byId;
const getUsers = state => state.users.byId;
const getSelectedEvent = state => state.events.selectedEvent;
const getCurrentDetails = state => {
    return {
        mode: state.events.mode,
        relatedBooking: state.events.relatedBooking,
        parentRoute: state.events.parentRoute,
        loading: state.events.loading
    };
};

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
    let { selectedEvent, mode, parentRoute, relatedBooking, loading } = details;
    let event = eventsById[details.selectedEvent];
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
