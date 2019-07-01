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
        address: null,
        specialDirections: "",
        date: null,
        startTime: null,
        duration: null,
        price: 15,
        minGuests: 4,
        maxGuests: 8
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

    submit = () => {
        // merge date and time
        let time = moment(this.state.startTime).toISOString();
        let date = this.state.date.toISOString();
        let startTime = moment(date.split("T")[0] + "T" + time.split("T")[1]);
        console.log(startTime);
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
        const {
            navigation,
            screenProps: { preview }
        } = this.props;

        return (
            <CreateEventLogisticsStack
                navigation={navigation}
                screenProps={{
                    updateData: this.updateData,
                    state: this.state,
                    submit: this.submit,
                    preview: preview
                }}
            />
        );
    }
}

export default CreateEventLogistics;
