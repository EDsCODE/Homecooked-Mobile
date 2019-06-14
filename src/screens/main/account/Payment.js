import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Button } from "react-native";

import Header from "Homecooked/src/components/Headers/Basic";
import NavigationService from "Homecooked/src/utils/NavigationService";

import { authTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

import { LiteCreditCardInput } from "react-native-credit-card-input";

class Payment extends Component {
    _goBack = () => {
        NavigationService.navigate("AccountMain");
    };

    _onChange = form => console.log(form);

    render() {
        return (
            <View>
                <Header title={"Payment"} leftOnPress={this._goBack} />
                <LiteCreditCardInput onChange={this._onChange} />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    const signout = () => {
        dispatch({
            type: authTypes.SIGNOUT_REQUEST
        });
    };
    return {
        signout
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Payment);
