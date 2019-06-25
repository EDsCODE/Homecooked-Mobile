import React from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./main";

const SettingsStack = createStackNavigator(
    {
        SettingsMain: {
            screen: Main
        }
    },
    {
        initialRouteName: "SettingsMain",
        mode: "modal",
        headerMode: "none"
    }
);

export default SettingsStack;
