import React from "react";
import { createStackNavigator } from "react-navigation";
import UpcomingEvent from "./UpcomingEvent";

const UpcomingEventStack = createStackNavigator(
    {
        UpcomingEvent: {
            screen: UpcomingEvent
        }
    },
    {
        initialRouteName: "UpcomingEvent",
        headerMode: "none"
    }
);

export default UpcomingEvent;
