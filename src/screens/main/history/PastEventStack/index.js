import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import PastEvent from "./PastEvent";
import Person from "Homecooked/src/screens/main/common/Person";

const PastEventStack = createStackNavigator(
    {
        PastEvent: {
            screen: PastEvent
        },
        PastEventPerson: {
            screen: ({ navigation }) => (
                <Person navigation={navigation} parentRoute={"Event"} />
            )
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
