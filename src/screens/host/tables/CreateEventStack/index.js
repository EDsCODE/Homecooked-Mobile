import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Details from "./Details";
import Food from "./Food";
import Logistics from "./Logistics";

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
        }
    },
    {
        initialRouteName: "CreateEventLogistics",
        headerMode: "none"
    }
);

export default CreateEventStack;
