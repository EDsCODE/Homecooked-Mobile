import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Button } from "react-native";

import Header from "Homecooked/src/components/Headers/Basic";
import NavigationService from "Homecooked/src/utils/NavigationService";

import { authTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

class SettingsMain extends Component {
    _goBack = () => {
        NavigationService.navigate("AccountMain");
    };

    signOut = () => {
        this.props.signout();
        NavigationService.navigate("Auth");
    };

    render() {
        return (
            <View>
                <Header title={"Settings"} leftOnPress={this._goBack} />
                <Button title={"Sign Out"} onPress={this.signOut} />
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
)(SettingsMain);
