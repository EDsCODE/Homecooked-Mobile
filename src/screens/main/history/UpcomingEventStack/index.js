import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import UpcomingEvent from "./UpcomingEvent";
import Person from "Homecooked/src/screens/main/common/Person";

const UpcomingEventStack = createStackNavigator(
    {
        UpcomingEvent: {
            screen: UpcomingEvent
        },
        PastEventPerson: {
            screen: ({ navigation }) => (
                <Person navigation={navigation} parentRoute={"Event"} />
            )
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
