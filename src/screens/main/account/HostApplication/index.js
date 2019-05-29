import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Prompt from "./Prompt";
import BasicInfo from "./BasicInfo";
import ShortResponse from "./ShortResponse";
import Photos from "./Photos";
import Finish from "./Finish";

const HostApplicationStack = createStackNavigator(
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
        },
        Finish: {
            screen: Finish
        }
    },
    {
        initialRouteName: "Photos",
        headerMode: "none"
    }
);

class HostApplication extends Component {
    static router = HostApplicationStack.router;

    state = {
        address: null,
        phoneNumber: null,
        reason: null,
        experience: null
    };

    updateData = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const { navigation } = this.props;

        return (
            <HostApplicationStack
                navigation={navigation}
                screenProps={{ updateData: this.updateData, state: this.state }}
            />
        );
    }
}

export default HostApplication;
