import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import PastEvent from "./PastEvent";

const PastEventStack = createStackNavigator(
    {
        PastEvent: {
            screen: PastEvent
        }
    },
    {
        initialRouteName: "PastEvent",
        headerMode: "none"
    }
);

class PastEventMain extends Component {
    static router = PastEventStack.router;

    render() {
        const { navigation } = this.props;
        return <PastEventStack navigation={navigation} />;
    }
}

export default PastEventMain;
