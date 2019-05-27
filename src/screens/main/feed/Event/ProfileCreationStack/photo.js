import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import FloatyButton from "Homecooked/src/components/Buttons/FloatyButton";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const placeHolderWidth = 140;

export default class Photo extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    _goNext = () => {
        this.props.navigation.navigate("Bio");
    };

    render() {
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} icon={"arrow-round-back"} />
                <HeadingText>Profile Picture</HeadingText>
                <PromptText style={{ marginTop: Spacing.small }}>
                    Homecooked meals are warm and inviting. Upload a photo that
                    captures that spirit!
                </PromptText>

                <FloatyButton
                    onPress={this._goNext}
                    style={{
                        position: "absolute",
                        bottom: Spacing.largest,
                        right: Spacing.largest
                    }}
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
    },
    placeholderContainer: {
        marginTop: Spacing.small,
        width: placeHolderWidth * 2 + 20,
        height: placeHolderWidth * 2 + 20,
        alignSelf: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "space-around"
    }
});
