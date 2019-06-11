import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./main";
import Guests from "./guests";
import Directions from "./directions";
import Time from "./time";
import Price from "./price";
import DateScreen from "./date";
import Address from "./address";

import moment from "moment";

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
        address: {},
        specialDirections: "test special directions",
        date: moment(),
        startTime: moment(),
        duration: 1,
        price: 15,
        minGuests: 4,
        maxGuests: 6
    };

    updateData = (key, value, cb) => {
        this.setState(
            {
                [key]: value
            },
            () => {
                typeof cb === "function" && cb();
            }
        );
    };

    submit = async () => {
        // merge date and time
        let time = moment(this.state.startTime).format("hh:mm:ss a");
        let date = this.state.date.format("YYYY-MM-DD");
        let startTime = moment(time + " " + date);
        this.setState(
            {
                ...this.state,
                startTime
            },
            () => {
                this.props.screenProps.updateData("logistics", this.state);
            }
        );
    };

    render() {
        const { navigation } = this.props;

        return (
            <CreateEventLogisticsStack
                navigation={navigation}
                screenProps={{
                    updateData: this.updateData,
                    state: this.state,
                    submit: this.submit
                }}
            />
        );
    }
}

export default CreateEventLogistics;
