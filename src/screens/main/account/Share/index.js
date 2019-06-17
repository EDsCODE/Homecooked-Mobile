import React from "react";
import { createStackNavigator } from "react-navigation";
import Main from "./main";

const ShareStack = createStackNavigator(
    {
        Share: {
            screen: Main
        }
    },
    {
        initialRouteName: "Share",
        mode: "modal",
        headerMode: "none"
    }
);

export default ShareStack;
