import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import NavigationService from "Homecooked/src/utils/NavigationService";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const placeHolderWidth = 140;

export default class Bio extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    _goNext = () => {
        NavigationService.navigate("Event");
    };

    render() {
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} icon={"arrow-round-back"} />
                <HeadingText>Write a Bio</HeadingText>
                <PromptText style={{ marginTop: Spacing.small }}>
                    Each guest brings a unique flavor to the Homecooked
                    experience.
                </PromptText>

                <BarButton
                    title="Complete Profile"
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
