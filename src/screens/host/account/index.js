import React from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./main";
import Profile from "./Profile";

const SettingsStack = createStackNavigator(
    {
        HostSettingsMain: {
            screen: Main
        },
        Profile: {
            screen: Profile
        }
    },
    {
        initialRouteName: "HostSettingsMain",
        mode: "modal",
        headerMode: "none"
    }
);

// remove tabbar when a route is clicked in settings
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
