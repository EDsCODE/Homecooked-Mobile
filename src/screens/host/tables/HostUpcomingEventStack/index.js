import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import HostUpcomingEvent from "./HostUpcomingEvent";
import Person from "Homecooked/src/screens/main/common/Person";

const HostUpcomingEventStack = createStackNavigator(
    {
        HostUpcomingEvent: {
            screen: HostUpcomingEvent
        },
        HostUpcomingEventPerson: {
            screen: ({ navigation }) => (
                <Person
                    navigation={navigation}
                    parentRoute={"HostUpcomingEvent"}
                />
            )
        }
    },
    {
        initialRouteName: "HostUpcomingEvent",
        headerMode: "none",
        mode: "modal"
    }
);

class HostUpcomingEventScreen extends Component {
    static router = HostUpcomingEventStack.router;

    render() {
        const { navigation } = this.props;
        return <HostUpcomingEventStack navigation={navigation} />;
    }
}

export default HostUpcomingEventScreen;
