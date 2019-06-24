import { createSelector } from "reselect";
import _ from "lodash";

const getEvents = state => state.events.byId;
const getNotifications = state => state.notifications.data;

export const getNotificationsWithEvent = createSelector(
    [getEvents, getNotifications],
    (events, notifications) => {
        _.forEach(notifications, notification => {
            notification.event = events[notification.entityId];
        });
        return notifications;
    }
);
