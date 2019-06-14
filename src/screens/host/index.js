import React, { Component } from "react";
import { Linking } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import Tables from "./tables";
// import Ratings from "./ratings";
// import Notifications from "./notifications";
import Account from "./account";

import { stringUtils } from "Homecooked/src/utils";

import { connect } from "react-redux";
import { hostTypes } from "Homecooked/src/modules/types";

const HostStack = createBottomTabNavigator(
    {
        HostTables: {
            screen: Tables
        },
        HostAccount: {
            screen: Account
        }
    },
    {
        initialRouteName: "HostTables"
    }
);

class HostMain extends Component {
    static router = HostStack.router;

    componentDidMount() {
        Linking.addEventListener("url", this._handleOpenURL);
    }

    componentWillUnmount() {
        Linking.removeEventListener("url", this._handleOpenURL);
    }

    _handleOpenURL = event => {
        let parsed = stringUtils.parseURL(event.url);
        console.log(parsed);
        if (parsed.params.stripe_account_id) {
            this.props.updateStripeAccountId(parsed.params.stripe_account_id);
        }
    };

    render() {
        const { navigation } = this.props;
        return <HostStack navigation={navigation} />;
    }
}

const mapDispatchToProps = dispatch => {
    const updateStripeAccountId = stripeAccountId => {
        dispatch({
            type: hostTypes.UPDATE_ACCOUNT_ID,
            payload: { stripeAccountId }
        });
    };
    return {
        updateStripeAccountId
    };
};

export default connect(
    null,
    mapDispatchToProps
)(HostMain);
