import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import UpcomingEvent from "./UpcomingEvent";

const UpcomingEventStack = createStackNavigator(
    {
        UpcomingEvent: {
            screen: UpcomingEvent
        }
    },
    {
        initialRouteName: "UpcomingEvent",
        headerMode: "none"
    }
);

class UpcomingEventMain extends Component {
    static router = UpcomingEventStack.router;

    render() {
        const { navigation } = this.props;
        return <UpcomingEventStack navigation={navigation} />;
    }
}

export default UpcomingEventMain;
