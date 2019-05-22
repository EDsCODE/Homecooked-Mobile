import React from "react";
import { createStackNavigator } from "react-navigation";
import Prompt from "./Prompt";
import BasicInfo from "./BasicInfo";
import ShortResponse from "./ShortResponse";
import Photos from "./Photos";

export default createStackNavigator(
    {
        Prompt: {
            screen: Prompt
        },
        BasicInfo: {
            screen: BasicInfo
        },
        ShortResponse: {
            screen: ShortResponse
        },
        Photos: {
            screen: Photos
        }
    },
    {
        initialRouteName: "Photos",
        headerMode: "none"
    }
);
