import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import MinorText from "Homecooked/src/components/Text/Minor";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import ImagePicker from "react-native-image-picker";
import ImagePlaceholder from "Homecooked/src/components/Image/Placeholder";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";

import _ from "lodash";

import { connect } from "react-redux";
import * as hostSelectors from "Homecooked/src/modules/host/selectors";

const placeHolderWidth = 120;

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

class EventMedia extends Component {
    state = {
        images: [],
        upload: [],
        mediaKeys: [],
        loading: false
    };

    componentDidMount() {
        let media = this.props.currentHost.media;
        let avatar = this.props.currentHost.profileImageSignedUrl;
        let eventMedias = _.filter(media, ["type", "EVENT"]);
        let mediaKeys = eventMedias.map(eventMedia => eventMedia.key);
        let eventImages = eventMedias.map(media => media.url);
        let allImages = [avatar].concat(eventImages);
        this.setState({
            images: allImages,
            mediaKeys
        });
    }

    _goBack = () => {
        this.props.navigation.goBack();
    };

    _goNext = () => {
        // console.log(this.state);
        this.props.screenProps.updateData("upload", this.state.upload);
        this.props.screenProps.updateData("mediaKeys", this.state.mediaKeys);
        this.props.screenProps.updateData("media", this.state.images, () => {
            this.props.screenProps.preview();
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
                    [index]: response.uri
                },
                upload: {
                    ...this.state.upload,
                    [index]: response
                }
            });
        });
    };

    render() {
        let { loading, images, upload } = this.state;

        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} icon={"arrow-round-back"} />
                <MinorText>Step 4 of 4</MinorText>
                <HeadingText>Review Photos</HeadingText>
                <PromptText style={{ marginTop: Spacing.small }}>
                    Tap to edit a photograph. You can change your profile
                    picture later, under Account > Edit Profile.
                </PromptText>
                <PromptText style={{ marginTop: Spacing.small }}>
                    High-quality photos significantly help book out your table.
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
                                    uri: images[index] ? images[index] : null
                                }}
                                inactive={index == 0 ? true : false}
                            />
                        );
                    })}
                </View>

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
                    loading={loading}
                    active={upload.length}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        fields: hostSelectors.getEventFields(state),
        currentUser: state.currentUser,
        currentHost: state.host
    };
};

export default connect(
    mapStateToProps,
    null
)(EventMedia);

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
