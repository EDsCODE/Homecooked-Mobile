import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import NavigationService from "Homecooked/src/utils/NavigationService";
import HeadingText from "Homecooked/src/components/Text/Heading";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import InfoSection from "Homecooked/src/components/Event/Info";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const placeHolderWidth = 140;

export default class Prompt extends Component {
    _goBack = () => {
        NavigationService.navigate("Event");
    };

    _goNext = () => {
        this.props.navigation.navigate("Photo");
    };

    render() {
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>Review and Booking</HeadingText>
                <InfoSection />
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
