import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import BarButton from "Homecooked/src/components/Buttons/BarButton";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const GATHR_LOGO = require("Homecooked/src/assets/img/OrangeTextLogoNEW.png");

export default class Prompt extends Component {
    _goNext = () => {
        this.props.navigation.navigate("Notification");
    };

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <HeadingText>Welcome to</HeadingText>
                    <Image
                        source={GATHR_LOGO}
                        style={{
                            height: 60,
                            width: 100,
                            marginLeft: Spacing.smallest
                        }}
                        resizeMode={"contain"}
                    />
                </View>

                <PromptText
                    style={{
                        marginTop: Spacing.small,
                        marginHorizontal: Spacing.large
                    }}
                >
                    Before you explore the app, we have a few questions that’ll
                    help us personalize your experience.
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
        paddingTop: Spacing.larger,
        justifyContent: "center",
        alignItems: "center"
    }
});
