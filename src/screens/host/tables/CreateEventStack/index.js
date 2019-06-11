import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Details from "./Details";
import Food from "./Food";
import Logistics from "./Logistics";
import Preview from "./Preview";

const CreateEventStack = createStackNavigator(
    {
        CreateEventDetails: {
            screen: Details
        },
        CreateEventLogistics: {
            screen: Logistics
        },
        CreateEventFood: {
            screen: Food
        },
        Preview: {
            screen: Preview
        }
    },
    {
        initialRouteName: "CreateEventLogistics",
        headerMode: "none"
    }
);

class CreateEvent extends Component {
    static router = CreateEventStack.router;

    state = {
        details: {},
        logistics: {},
        food: {}
    };

    updateData = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    submit = () => {
        console.log(this.state);
    };

    render() {
        const { navigation } = this.props;

        return (
            <CreateEventStack
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

export default CreateEvent;
