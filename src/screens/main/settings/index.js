import React from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./main";
import HostApplication from "./HostApplication";

const SettingsStack = createStackNavigator(
    {
        SettingsMain: {
            screen: Main
        },
        HostApplication: {
            screen: HostApplication
        }
    },
    {
        initialRouteName: "SettingsMain",
        mode: "modal",
        headerMode: "none"
    }
);

SettingsStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible
    };
};

export default SettingsStack;
