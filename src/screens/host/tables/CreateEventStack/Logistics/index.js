import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./main";
import Guests from "./guests";
import Directions from "./directions";
import Time from "./time";
import Price from "./price";
import DateScreen from "./date";
import Address from "./address";

const CreateEventLogisticsStack = createStackNavigator(
    {
        LogisticsMain: {
            screen: Main
        },
        LogisticsGuests: {
            screen: Guests
        },
        LogisticsAddress: {
            screen: Address
        },
        LogisticsDate: {
            screen: DateScreen
        },
        LogisticsDirections: {
            screen: Directions
        },
        LogisticsPrice: {
            screen: Price
        },
        LogisticsTime: {
            screen: Time
        }
    },
    {
        initialRouteName: "LogisticsMain",
        headerMode: "none",
        mode: "modal"
    }
);

class CreateEventLogistics extends Component {
    static router = CreateEventLogisticsStack.router;

    state = {
        address: "",
        specialDirections: "",
        date: "",
        startTime: "",
        endTIme: "",
        price: "",
        minGuests: 0,
        maxGuests: 0
    };

    updateData = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const { navigation } = this.props;

        return (
            <CreateEventLogisticsStack
                navigation={navigation}
                screenProps={{ updateData: this.updateData, state: this.state }}
            />
        );
    }
}

export default CreateEventLogistics;
