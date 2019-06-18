import React from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./main";
import CreateEventStack from "./CreateEventStack";
import Event from "Homecooked/src/screens/common/Event";

const TablesStack = createStackNavigator(
    {
        HostTablesMain: {
            screen: Main
        },
        CreateEventStack: {
            screen: CreateEventStack
        },
        HostTablesMainEvent: {
            screen: Event
        }
    },
    {
        initialRouteName: "HostTablesMain",
        headerMode: "none"
    }
);

// remove tabbar when a route is clicked in settings
TablesStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible
    };
};

export default TablesStack;
