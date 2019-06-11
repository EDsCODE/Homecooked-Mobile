import React, { Component } from "react";

import { createStackNavigator } from "react-navigation";
import HostPastEvent from "./HostPastEvent";

const HostPastStack = createStackNavigator(
    {
        HostPastEvent: {
            screen: HostPastEvent
        }
    },
    {
        initialRouteName: "HostPastEvent",
        headerMode: "none",
        mode: "modal"
    }
);

class HostPast extends Component {
    static router = HostPastStack.router;

    render() {
        const { navigation } = this.props;
        return <HostPastStack navigation={navigation} />;
    }
}

export default HostPast;
