import React, { Component } from "react";
import { createBottomTabNavigator } from "react-navigation";
import Feed from "./feed";
import HistoryStack from "./history";
import Notifications from "./notifications";
import Account from "./account";

const MainStack = createBottomTabNavigator(
    {
        Feed: {
            screen: Feed
        },
        History: {
            screen: HistoryStack
        },
        Notification: {
            screen: Notifications
        },
        Account: {
            screen: Account
        }
    },
    {
        initialRouteName: "Feed"
    }
);

class Main extends Component {
    static router = MainStack.router;

    render() {
        const { navigation } = this.props;
        return <MainStack navigation={navigation} />;
    }
}

export default Main;
