import { createSelector } from "reselect";
import _ from "lodash";
import moment from "moment";
import { EventViewTypes } from "Homecooked/src/types";

export const host = state => state.host;
export const chefId = state => state.host.id;
export const media = state => {
    let mediaDict = state.host.media;
    return Object.values(mediaDict);
};
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

export const getHostImage = state => {
    let image = _.find(state.host.media, ["type", "AVATAR"]);
    return image;
};

export const getActiveEvents = createSelector(
    [getEventsbyChefId, getUsers],
    (events, users) => {
        let activeEvents = events.filter(
            event => event.status == "OPN" || event.status == "FUL"
        );
        activeEvents.forEach(event => {
            if (moment(event.startTime) < moment()) {
                event.mode = EventViewTypes.HOST_ACTIVE;
            } else {
                event.mode = EventViewTypes.HOST_CLOSEABLE;
            }
        });
        console.log(activeEvents);
        return activeEvents;
    }
);

export const getInReviewEvents = createSelector(
    [getEventsbyChefId, getUsers],
    (events, users) => {
        let activeEvents = events.filter(event => event.status == "REV");
        activeEvents.forEach(event => {
            event.mode = EventViewTypes.HOST_IN_REVIEW;
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
        inactiveEvents.forEach(event => {
            event.mode = EventViewTypes.HOST_PAST;
        });
        return inactiveEvents;
    }
);

export const getEventFields = state => state.host.preferences.fields;
