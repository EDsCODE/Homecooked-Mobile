import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./main";
import Menu from "./menu";
import Dietary from "./dietary";

const CreateEventFoodStack = createStackNavigator(
    {
        FoodMain: {
            screen: Main
        },
        FoodMenu: {
            screen: Menu
        },
        FoodDietary: {
            screen: Dietary
        }
    },
    {
        initialRouteName: "FoodMain",
        headerMode: "none",
        mode: "modal"
    }
);

class CreateEventFood extends Component {
    static router = CreateEventFoodStack.router;

    state = {
        menu: [],
        restrictions: {},
        preferences: {}
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
        this.props.screenProps.updateData("food", this.state);
    };

    render() {
        const { navigation } = this.props;

        return (
            <CreateEventFoodStack
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

export default CreateEventFood;
