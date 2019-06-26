import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import PromptText from "Homecooked/src/components/Text/Prompt";
import BarButton from "Homecooked/src/components/Buttons/BarButton";

import Permissions from "react-native-permissions";
import NavigationService from "Homecooked/src/utils/NavigationService";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class Location extends Component {
    _goNext = () => {
        NavigationService.navigate("Main");
    };

    // Request permission to access photos
    _requestPermission = () => {
        Permissions.request("location").then(response => {
            this._goNext();
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <PrimaryText style={{ marginTop: Spacing.small }}>
                    Join nearby meals
                </PrimaryText>

                <PromptText
                    style={{
                        marginTop: Spacing.small,
                        textAlign: "center",
                        marginHorizontal: Spacing.large
                    }}
                >
                    We help you discover meals in your neighborhood
                </PromptText>
                <BarButton
                    title="Enable Location"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.orange}
                    fill={Color.orange}
                    onPress={this._requestPermission}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
