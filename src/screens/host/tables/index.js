import React from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./main";
import HostUpcomingEventStack from "./HostUpcomingEventStack";
import HostPastEventStack from "./HostPastEventStack";
import CreateEventStack from "./CreateEventStack";

const TablesStack = createStackNavigator(
    {
        HostTablesMain: {
            screen: Main
        },
        CreateEventStack: {
            screen: CreateEventStack
        },
        HostUpcomingEventStack: {
            screen: HostUpcomingEventStack
        },
        HostPastEventStack: {
            screen: HostPastEventStack
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
