import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet, Image } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";
import Header from "Homecooked/src/components/Headers/Basic";
const BANNER_IMAGE = "Homecooked/src/assets/img/HostApplicationPrompt.jpg";

export default class Prompt extends Component {
    _goBack = () => {
        NavigationService.navigate("AccountMain");
    };

    _goNext = () => {
        this.props.navigation.navigate("BasicInfo");
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Host for Gathr" leftOnPress={this._goBack} />
                <Image
                    source={require(BANNER_IMAGE)}
                    style={{ width: Spacing.deviceWidth, height: 220 }}
                />
                <View style={styles.container}>
                    <PrimaryText>
                        Get paid to bring your community closer through food.
                    </PrimaryText>

                    <PromptText style={{ marginTop: Spacing.base }}>
                        Becoming a host for Gathr is fun and rewarding. Just
                        follow these three easy steps:
                    </PromptText>
                    <PromptText style={{ marginTop: Spacing.base }}>
                        {`1. In-app cook application\n2. Phone screening\n3. Host a trial event`}
                    </PromptText>
                </View>
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
