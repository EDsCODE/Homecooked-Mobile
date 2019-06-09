import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Review from "./review";
import Confirmed from "./confirmed";
import Invite from "./invite";

const BookingStack = createStackNavigator(
    {
        Review: {
            screen: Review
        },
        Confirmed: {
            screen: Confirmed
        },
        Invite: {
            screen: Invite
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
