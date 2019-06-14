import React, { Component } from "react";

import { createStackNavigator } from "react-navigation";
import HostPastEvent from "./HostPastEvent";
import Person from "Homecooked/src/screens/main/common/Person";

const HostPastStack = createStackNavigator(
    {
        HostPastEvent: {
            screen: HostPastEvent
        },
        HostPastEventPerson: {
            screen: ({ navigation }) => (
                <Person navigation={navigation} parentRoute={"Event"} />
            )
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
