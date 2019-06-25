import React from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./main";
import Event from "Homecooked/src/screens/common/Event";
import Review from "Homecooked/src/screens/common/RatingStack";

const HistoryStack = createStackNavigator(
    {
        HistoryMain: {
            screen: Main
        },
        HistoryMainEvent: {
            screen: Event
        },
        ReviewEvent: {
            screen: Review
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
