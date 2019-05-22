import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";

export default class Prompt extends Component {
    _goBack = () => {
        NavigationService.navigate("SettingsMain");
    };

    _goNext = () => {
        this.props.navigation.navigate("BasicInfo");
    };

    render() {
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <PrimaryText>
                    Our <Text style={{ color: Color.orange }}>hosts</Text> make
                    the magic happen. But, with great power comes great
                    responsibilities.
                </PrimaryText>
                <PrimaryText style={{ marginTop: Spacing.largest }}>
                    Here's a few of them:
                </PrimaryText>

                <PromptText style={{ marginTop: Spacing.base }}>
                    — Cook awesome food
                </PromptText>
                <PromptText style={{ marginTop: Spacing.base }}>
                    — Facilitate great conversations and help guests feel at
                    home
                </PromptText>
                <PromptText style={{ marginTop: Spacing.base }}>
                    — Handle some not-so-awesome situations
                </PromptText>

                <PrimaryText style={{ marginTop: Spacing.largest }}>
                    If you think you have what it takes, please apply!
                </PrimaryText>
                <BarButton
                    title="Let's get started"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.orange}
                    fill={Color.orange}
                    onPress={this._goNext}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: Spacing.large
    }
});
