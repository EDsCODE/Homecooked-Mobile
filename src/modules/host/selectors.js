import { createSelector } from "reselect";
import _ from "lodash";

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

        return activeEvents;
    }
);

export const getInReviewEvents = createSelector(
    [getEventsbyChefId, getUsers],
    (events, users) => {
        let activeEvents = events.filter(event => event.status == "REV");

        return activeEvents;
    }
);

export const getInactiveEvents = createSelector(
    [getEventsbyChefId, getUsers],
    (events, users) => {
        let inactiveEvents = events.filter(
            event => event.status == "CLO" || event.status == "CAN"
        );

        return inactiveEvents;
    }
);

export const getEventFields = state => state.host.preferences.fields;
