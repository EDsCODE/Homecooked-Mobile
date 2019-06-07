import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import MinorText from "Homecooked/src/components/Text/Minor";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";

import ImagePicker from "react-native-image-picker";
import ImagePlaceholder from "Homecooked/src/components/Image/Placeholder";

const placeHolderWidth = 140;

const placeholders = [
    {
        caption: "1. You cooking"
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
        images: {
            0: null,
            1: null,
            2: null,
            3: null
        },
        loading: false
    };
    _goBack = () => {
        this.props.navigation.goBack();
    };

    _goNext = () => {
        this.setState({
            loading: true
        });
        this.props.screenProps.updateData("images", this.state.images, () => {
            this.props.screenProps.submit();
        });
    };

    openPickerFor = index => {
        const options = {
            title: "Select Image",
            storageOptions: {
                skipBackup: true,
                path: "images"
            }
        };

        ImagePicker.launchImageLibrary(options, response => {
            this.setState({
                images: {
                    ...this.state.images,
                    [index]: response
                }
            });
        });
    };

    render() {
        let { reason, experience, loading, images } = this.state;
        console.log(images);
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
                    {placeholders.map((item, index) => {
                        return (
                            <ImagePlaceholder
                                style={{
                                    width: placeHolderWidth,
                                    height: placeHolderWidth
                                }}
                                caption={item.caption}
                                onPress={() => this.openPickerFor(index)}
                                source={{
                                    uri: this.state.images[index]
                                        ? this.state.images[index].uri
                                        : null
                                }}
                            />
                        );
                    })}
                </View>

                <BarButton
                    title="Submit"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.orange}
                    fill={Color.orange}
                    onPress={this._goNext}
                    loading={loading}
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
