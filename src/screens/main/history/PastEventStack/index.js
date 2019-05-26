import React from "react";
import { createStackNavigator } from "react-navigation";
import PastEvent from "./PastEvent";

const PastEventStack = createStackNavigator(
    {
        PastEvent: {
            screen: PastEvent
        }
    },
    {
        initialRouteName: "PastEvent",
        headerMode: "none"
    }
);

export default PastEvent;
