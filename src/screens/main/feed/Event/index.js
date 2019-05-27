import React from "react";
import { createStackNavigator } from "react-navigation";
import Event from "./event";
import ProfileCreationStack from "./ProfileCreationStack";
import BookingStack from "./BookingStack";

const EventStack = createStackNavigator(
    {
        Event: {
            screen: Event
        },
        ProfileCreationStack: {
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
