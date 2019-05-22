import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import MinorText from "Homecooked/src/components/Text/Minor";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import FloatyButton from "Homecooked/src/components/Buttons/FloatyButton";
import SecondaryText from "Homecooked/src/components/Text/Secondary";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";

import ImagePlaceholder from "Homecooked/src/components/Image/Placeholder";

const placeHolderWidth = 140;

const placeholders = [
    {
        caption: "1. Yourself"
    },
    {
        caption: "2. Your space"
    },
    {
        caption: "3. Your food"
    },
    {
        caption: "4. Optional"
    }
];

export default class Photos extends Component {
    state = {
        reason: "",
        experience: ""
    };
    _goBack = () => {
        NavigationService.navigate("SettingsMain");
    };

    render() {
        let { reason, experience } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <MinorText>Step 3 of 3</MinorText>
                <HeadingText>Upload Photos</HeadingText>
                <PromptText style={{ marginTop: Spacing.small }}>
                    As part of our application process, we kindly ask you to
                    upload the following three photos.
                </PromptText>
                <View style={styles.placeholderContainer}>
                    {placeholders.map(item => (
                        <ImagePlaceholder
                            style={{
                                width: placeHolderWidth,
                                height: placeHolderWidth
                            }}
                            caption={item.caption}
                        />
                    ))}
                </View>

                <FloatyButton
                    onPress={() => this._swiper.scrollBy(1)}
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
