import React from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./main";
import UpcomingEventStack from "./UpcomingEventStack";
import PastEventStack from "./PastEventStack";

const HistoryStack = createStackNavigator(
    {
        HistoryMain: {
            screen: Main
        },
        UpcomingEventStack: {
            screen: UpcomingEventStack
        },
        PastEventStack: {
            screen: PastEventStack
        }
    },
    {
        initialRouteName: "HistoryMain",
        headerMode: "none"
    }
);

// remove tabbar when a route is clicked in settings
HistoryStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible
    };
};

export default HistoryStack;
