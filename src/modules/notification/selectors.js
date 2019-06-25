import { createSelector } from "reselect";
import _ from "lodash";
import { EventViewTypes } from "Homecooked/src/types";
import moment from "moment";

const getEvents = state => state.events.byId;
const getNotifications = state => state.notifications.data;
const getBookings = state => state.currentUser.bookings;

export const getGuestNotificationsWithEvent = createSelector(
    [getEvents, getNotifications, getBookings],
    (events, notifications, currentBookings) => {
        let currentBookingsArray = Object.values(currentBookings);
        _.forEach(notifications, notification => {
            notification.event = events[notification.entityId];
            let mode = determineEventViewMode(
                notification.event,
                currentBookingsArray
            );
            notification.event.mode = mode;
        });
        return notifications;
    }
);

export const getHostNotificationsWithEvent = createSelector(
    [getEvents, getNotifications],
    (events, notifications) => {
        _.forEach(notifications, notification => {
            notification.event = events[notification.entityId];
            notification.event.mode = EventViewTypes.FEED;
        });
        return notifications;
    }
);

function determineEventViewMode(event, currentBookings) {
    let status = event.status;
    if (status == "OPN" || status == "FUL") {
        if (moment(event.startTime) < moment()) {
            return EventViewTypes.HISTORY_PAST;
        } else {
            let atTheTable = determineUserRelation(event, currentBookings);
            if (atTheTable) {
                return EventViewTypes.HISTORY_UPCOMING;
            } else {
                return EventViewTypes.FEED;
            }
        }
    } else {
        return EventViewTypes.HISTORY_PAST;
    }
}

function determineUserRelation(event, currentBookings) {
    currentBookings.forEach(booking => {
        if (booking.eventId == event.id) {
            return true;
        }
    });
    return false;
}
