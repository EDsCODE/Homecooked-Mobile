import React from "react";
import { createStackNavigator } from "react-navigation";
import HostPastEvent from "./HostPastEvent";

const EventStack = createStackNavigator(
    {
        HostPastEvent: {
            screen: HostPastEvent
        }
    },
    {
        initialRouteName: "HostPastEvent",
        headerMode: "none",
        mode: "modal"
    }
);

export default EventStack;
