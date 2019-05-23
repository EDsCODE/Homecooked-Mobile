import React from "react";
import { createStackNavigator } from "react-navigation";
import Event from "./event";

const EventStack = createStackNavigator(
    {
        Event: {
            screen: Event
        }
    },
    {
        initialRouteName: "Event",
        headerMode: "none"
    }
);

export default EventStack;
