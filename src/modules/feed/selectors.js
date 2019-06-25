// get events user is not involved in
import { createSelector } from "reselect";
import { CityFilter, EventViewTypes } from "Homecooked/src/types";

const getCurrentBookings = state => state.currentUser.bookings;
const getEvents = state => state.events.byId;
const getUsers = state => state.users.byId;
const getChefId = state => state.host.id;
const filterByCity = state => state.feed.filterByCity;

const getActiveEvents = createSelector(
    [getEvents, getCurrentBookings, getUsers, getChefId],
    (events, bookings, users, chefId) => {
        // check if bookings overlap with currentUser Bookings
        let currentBookingsArray = Object.values(bookings);
        let eventsArray = Object.values(events);

        // remove events that user is a part of
        eventsArray = eventsArray.filter(event => {
            if (event.status == "OPN") {
                if (chefId && chefId == event.chef.id) {
                    return false;
                }
                for (let x = 0; x < currentBookingsArray.length; x++) {
                    if (event.id == currentBookingsArray[x].eventId) {
                        return false;
                    }
                }
                event.mode = EventViewTypes.FEED;
                return true;
            }
            return false;
        });
        return eventsArray;
    }
);

export const getEventsForCity = createSelector(
    [getActiveEvents, filterByCity],
    (events, cityIndex) => {
        if (cityIndex == 0) {
            return events;
        } else {
            let filtered = events.filter(
                event => event.marker.city == CityFilter[cityIndex]
            );
            return filtered;
        }
    }
);
