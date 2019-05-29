import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Button } from "react-native";

import Header from "Homecooked/src/components/Headers/Basic";
import NavigationService from "Homecooked/src/utils/NavigationService";

export default class SettingsMain extends Component {
    _goBack = () => {
        NavigationService.navigate("AccountMain");
    };

    render() {
        return (
            <View>
                <Header title={"Settings"} leftOnPress={this._goBack} />
                <Button title={"Sign Out"} />
            </View>
        );
    }
}
