import React from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./main";
import Event from "Homecooked/src/screens/common/Event";

const NotificationStack = createStackNavigator(
    {
        NotificationMain: {
            screen: Main
        },
        NotificationMainEvent: {
            screen: Event
        }
    },
    {
        initialRouteName: "NotificationMain",
        headerMode: "none"
    }
);

// remove tabbar when a route is clicked in settings
NotificationStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible
    };
};

export default NotificationStack;
