import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import PromptText from "Homecooked/src/components/Text/Prompt";
import BarButton from "Homecooked/src/components/Buttons/BarButton";

import NavigationService from "Homecooked/src/utils/NavigationService";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class ProfilePrompt extends Component {
    _goNext = () => {
        NavigationService.navigate("OnboardingProfileCreationStack");
    };

    render() {
        return (
            <View style={styles.container}>
                <PrimaryText style={{ marginTop: Spacing.small }}>
                    People first, Food Second
                </PrimaryText>

                <PromptText
                    style={{
                        marginTop: Spacing.small,
                        textAlign: "center",
                        marginHorizontal: Spacing.large
                    }}
                >
                    Each guest brings a unique flavor to the Homecooked
                    experience. Show us yours!
                </PromptText>
                <BarButton
                    title="Continue"
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
        justifyContent: "center",
        alignItems: "center"
    }
});
