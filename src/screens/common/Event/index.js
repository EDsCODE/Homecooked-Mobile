import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Event from "./event";
import ProfileCreationStack from "Homecooked/src/screens/main/common/ProfileCreationStack";
import BookingStack from "./BookingStack";
import Person from "Homecooked/src/screens/main/common/Person";
import RefundConfirmation from "./RefundConfirmation";
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
            screen: ({ navigation }) => (
                <Person navigation={navigation} parentRoute={"Event"} />
            )
        },
        RefundConfirmation: {
            screen: RefundConfirmation
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
