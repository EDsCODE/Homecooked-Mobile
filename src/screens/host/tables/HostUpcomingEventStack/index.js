import React from "react";
import { createStackNavigator } from "react-navigation";
import HostUpcomingEvent from "./HostUpcomingEvent";

const EventStack = createStackNavigator(
    {
        HostUpcomingEvent: {
            screen: HostUpcomingEvent
        }
    },
    {
        initialRouteName: "HostUpcomingEvent",
        headerMode: "none",
        mode: "modal"
    }
);

export default EventStack;
