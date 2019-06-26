import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Review from "./review";
import Confirmed from "./confirmed";
import Invite from "./invite";

import EditProfileStack from "Homecooked/src/screens/main/common/EditProfile";

const BookingStack = createStackNavigator(
    {
        Review: {
            screen: Review,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        Confirmed: {
            screen: Confirmed,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        Invite: {
            screen: Invite
        },
        EditProfileStack: {
            screen: EditProfileStack
        }
    },
    {
        initialRouteName: "Review",
        headerMode: "none"
    }
);

class Booking extends Component {
    static router = BookingStack.router;

    render() {
        const { navigation } = this.props;
        return <BookingStack navigation={navigation} />;
    }
}

export default Booking;
