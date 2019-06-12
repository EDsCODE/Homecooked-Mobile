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
        lat: 5.12390123,
        lng: 50.108923,
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
        let { address, lat, lng, reason, experience, images } = this.state;
        this.props.createApplication(
            address,
            lat,
            lng,
            reason,
            experience,
            images
        );
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
    const createApplication = (
        address,
        lat,
        lng,
        reason,
        experience,
        images
    ) => {
        dispatch({
            type: hostTypes.CREATE_APPLICATION_REQUEST,
            payload: {
                address,
                lat,
                lng,
                images,
                reason,
                experience
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
