import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Location from "./Location";
import Notification from "./Notification";
import Prompt from "./Prompt";
import Schedule from "./Schedule";
import ProfilePrompt from "./ProfilePrompt";

const state = {
    email: "",
    password: "",
    firstName: ""
};

const OnboardingStack = createStackNavigator(
    {
        Schedule: {
            screen: Schedule
        },
        Location: {
            screen: Location
        },
        Notification: {
            screen: Notification
        },
        ProfilePrompt: {
            screen: ProfilePrompt
        },
        Prompt: {
            screen: Prompt
        }
    },
    {
        initialRouteName: "Prompt",
        headerMode: "none"
    }
);

export default OnboardingStack;
