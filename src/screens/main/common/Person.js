import React, { Component } from "react";
import { View, ScrollView, Image, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import MinorText from "Homecooked/src/components/Text/Secondary";
import Separator from "Homecooked/src/components/Separator";
import CloseButton from "Homecooked/src/components/Buttons/Close";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const SAMPLE_IMAGE = "Homecooked/src/assets/img/filledTable.jpg";

export default class Person extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={styles.container}>
                <Image source={require(SAMPLE_IMAGE)} style={styles.image} />
                <View style={styles.infoContainer}>
                    <HeadingText>{"Eric"}</HeadingText>
                    <Separator style={styles.separatorSpacing} />
                    <MinorText style={styles.separatorSpacing}>
                        {"I’m Kevin, a student from Miami. "}
                    </MinorText>
                </View>
                <View style={styles.headerContainer}>
                    <CloseButton onPress={this._goBack} color={Color.white} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    infoContainer: {
        margin: Spacing.large
    },
    separatorSpacing: {
        marginVertical: Spacing.small
    },
    image: {
        width: Spacing.deviceWidth,
        height: Spacing.deviceWidth
    },
    headerContainer: {
        position: "absolute",
        paddingTop: 30,
        paddingHorizontal: Spacing.large
    }
});
