import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Prompt from "./Prompt";
import BasicInfo from "./BasicInfo";
import ShortResponse from "./ShortResponse";
import Photos from "./Photos";
import Finish from "./Finish";

import { hostTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

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
        initialRouteName: "Prompt",
        headerMode: "none"
    }
);

class HostApplication extends Component {
    static router = HostApplicationStack.router;

    state = {
        address: "klnasd",
        phoneNumber: "+17328775160",
        reason: "test reason",
        experience: "test experience",
        images: null
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

    submitApplication = () => {
        let { address, reason, experience, images } = this.state;
        let applicationInput = {
            address,
            reason,
            experience
        };
        console.log(applicationInput);
        this.props.createApplication(applicationInput, images);
    };

    render() {
        const { navigation } = this.props;

        return (
            <HostApplicationStack
                navigation={navigation}
                screenProps={{
                    updateData: this.updateData,
                    state: this.state,
                    submit: this.submitApplication
                }}
            />
        );
    }
}

const mapDispatchToProps = dispatch => {
    const createApplication = (applicationInput, images) => {
        dispatch({
            type: hostTypes.CREATE_APPLICATION_REQUEST,
            payload: {
                applicationInput,
                images
            }
        });
    };

    return {
        createApplication
    };
};

export default connect(
    null,
    mapDispatchToProps
)(HostApplication);
