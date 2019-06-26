import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Event from "./event";
import ProfileCreationStack from "Homecooked/src/screens/main/common/ProfileCreationStack";
import BookingStack from "./BookingStack";
import Person from "Homecooked/src/screens/main/common/Person";
import RefundConfirmation from "./RefundConfirmation";

import CancelConfirmation from "./CancelConfirmation";

const EventStack = createStackNavigator(
    {
        Event: {
            screen: Event
        },
        BookingProfileCreationStack: {
            screen: ProfileCreationStack
        },
        BookingStack: {
            screen: BookingStack
        },
        EventPerson: {
            screen: ({ navigation }) => <Person navigation={navigation} />
        },
        RefundConfirmation: {
            screen: RefundConfirmation
        },
        CancelConfirmation: {
            screen: CancelConfirmation
        }
    },
    {
        initialRouteName: "Event",
        headerMode: "none",
        mode: "modal"
    }
);

class EventMain extends Component {
    static router = EventStack.router;

    render() {
        const { navigation } = this.props;
        return <EventStack navigation={navigation} />;
    }
}

export default EventMain;
