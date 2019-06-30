import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import FloatyButton from "Homecooked/src/components/Buttons/FloatyButton";
import ImagePlaceholder from "Homecooked/src/components/Image/Placeholder";
import NavigationService from "Homecooked/src/utils/NavigationService";

import { ImagePicker } from "Homecooked/src/components/Image/Picker";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

import { hostTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

const placeHolderWidth = Spacing.deviceWidth - 80;

class Photo extends Component {
    state = {
        image: null
    };

    _goBack = () => {
        NavigationService.navigate("HostSettingsMain");
    };

    _goNext = () => {
        if (this.state.image) {
            this.props.uploadImage(this.state.image);
        }
        this.props.navigation.navigate("EditDescription");
    };

    openPicker = async () => {
        console.log("open picker");
        let response = await ImagePicker();
        if (response) {
            this.setState({
                image: response
            });
        }
    };

    displayImage = () => {
        if (this.state.image) {
            return this.state.image.uri;
        } else if (this.props.host.profileImageSignedUrl) {
            return this.props.host.profileImageSignedUrl;
        } else {
            return null;
        }
    };

    availableAction = () => {
        if (this.state.image || this.props.host.profileImageSignedUrl) {
            return true;
        } else {
            return false;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} icon={"arrow-round-back"} />
                <HeadingText>Host Profile Picture</HeadingText>
                <PromptText style={{ marginTop: Spacing.small }}>
                    gathr meals are warm and inviting. Upload a photo that
                    captures that spirit!
                </PromptText>
                <ImagePlaceholder
                    style={{
                        width: placeHolderWidth,
                        height: placeHolderWidth,
                        alignSelf: "center",
                        marginTop: Spacing.base
                    }}
                    caption={"Picture"}
                    onPress={this.openPicker}
                    source={{
                        uri: this.displayImage()
                    }}
                />
                <FloatyButton
                    onPress={this._goNext}
                    style={{
                        position: "absolute",
                        bottom: Spacing.largest,
                        right: Spacing.largest
                    }}
                    active={this.availableAction()}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    let { host } = state;
    return {
        host
    };
};

const mapDispatchToProps = dispatch => {
    const uploadImage = image => {
        dispatch({
            type: hostTypes.UPLOAD_HOST_IMAGE_REQUEST,
            payload: { image }
        });
    };
    return {
        uploadImage
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Photo);

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
