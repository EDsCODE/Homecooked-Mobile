import React from "react";
import { createStackNavigator } from "react-navigation";
import Event from "./event";
import ProfileCreationStack from "Homecooked/src/screens/main/common/ProfileCreationStack";
import BookingStack from "./BookingStack";

const EventStack = createStackNavigator(
    {
        Event: {
            screen: Event
        },
        BookingProfileCreationStack: {
            screen: ProfileCreationStack
        },
        BookingStack: {
            screen: BookingStack
        }
    },
    {
        initialRouteName: "Event",
        headerMode: "none",
        mode: "modal"
    }
);

export default EventStack;
