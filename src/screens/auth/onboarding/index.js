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
        }
    },
    {
        initialRouteName: "Schedule",
        headerMode: "none"
    }
);

export default OnboardingStack;
