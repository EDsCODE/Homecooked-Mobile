import { createSelector } from "reselect";

export const chefId = state => state.host.id;
const getEvents = state => state.events.byId;
const getUsers = state => state.users.byId;

const getEventsbyChefId = createSelector(
    [getEvents, chefId],
    (events, chefId) => {
        events = Object.values(events);
        let relatedEvents = [];
        relatedEvents = events.filter(event => event.chef.id == chefId);
        return relatedEvents;
    }
);

export const getActiveEvents = createSelector(
    [getEventsbyChefId, getUsers],
    (events, users) => {
        let activeEvents = events.filter(
            event => event.status == "OPN" || event.status == "FUL"
        );

        activeEvents.forEach((event, i) => {
            let bookings = event.bookings.filter(
                booking => booking.status == "CNF"
            );
            bookings.forEach((booking, j) => {
                bookings[j].user = users[booking.userId];
            });
            activeEvents[i].bookings = bookings;
        });
        return activeEvents;
    }
);

export const getInactiveEvents = createSelector(
    [getEventsbyChefId, getUsers],
    (events, users) => {
        let inactiveEvents = events.filter(
            event => event.status == "CLO" || event.status == "CAN"
        );

        inactiveEvents.forEach((event, i) => {
            let bookings = event.bookings.filter(
                booking => booking.status == "CNF"
            );
            bookings.forEach((booking, j) => {
                bookings[j].user = users[booking.userId];
            });
            inactiveEvents[i].bookings = bookings;
        });

        return inactiveEvents;
    }
);
