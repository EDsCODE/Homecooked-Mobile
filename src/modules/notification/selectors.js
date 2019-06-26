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

        notifications = _.filter(notifications, ["type", "GUEST"]);
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
        notifications = _.filter(notifications, ["type", "HOST"]);
        _.forEach(notifications, notification => {
            notification.event = events[notification.entityId];
            let mode = determineHostViewMode(notification.event);
            notification.event.mode = mode;
        });
        return notifications;
    }
);

function determineHostViewMode(event) {
    let status = event.status;
    if (status == "OPN" || status == "FUL") {
        if (moment(event.startTime) < moment()) {
            return EventViewTypes.HOST_CLOSEABLE;
        } else {
            return EventViewTypes.HOST_ACTIVE;
        }
    } else if (status == "REV") {
        return EventViewTypes.HOST_IN_REVIEW;
    } else {
        return EventViewTypes.HOST_PAST;
    }
}

function determineEventViewMode(event, currentBookings) {
    let status = event.status;
    let booking = determineUserRelation(event, currentBookings);
    if (booking) {
        if (booking.status == "CNF") {
            if (event.status == "OPN" || event.status == "FUL") {
                return EventViewTypes.HISTORY_UPCOMING;
            }
        } else if (booking.status == "ATT") {
            if (event.status == "CLO") {
                return EventViewTypes.HISTORY_REVIEW;
            }
        }
        return EventViewTypes.HISTORY_PAST;
    } else {
        if (status == "OPN" || status == "FUL") {
            if (moment(event.startTime) < moment()) {
                return EventViewTypes.HISTORY_PAST;
            } else {
                return EventViewTypes.FEED;
            }
        }
        return EventViewTypes.HISTORY_PAST;
    }
}

function determineUserRelation(event, currentBookings) {
    currentBookings.forEach(booking => {
        if (booking.eventId == event.id) {
            return booking;
        }
    });
    return null;
}
