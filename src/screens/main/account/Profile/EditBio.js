import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import NavigationService from "Homecooked/src/utils/NavigationService";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import TextField from "Homecooked/src/components/TextFields/Material";

import { currentUserTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

const placeHolderWidth = 140;

class Bio extends Component {
    state = {
        bio: ""
    };
    _goBack = () => {
        this.props.navigation.goBack();
    };

    _goNext = () => {
        if (this.state.bio) {
            this.props.updateUser({
                bio: this.state.bio
            });
        }
        this.props.navigation.navigate("ProfilePreview", {
            profileImageSignedUrl: this.props.currentUser.profileImageSignedUrl,
            bio: this.state.bio,
            firstName: this.props.currentUser.firstName
        });
    };

    displayBio = () => {
        if (this.state.bio) {
            return this.state.bio;
        } else if (this.props.currentUser.bio) {
            return this.props.currentUser.bio;
        } else {
            return "";
        }
    };

    render() {
        let { bio } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} icon={"arrow-round-back"} />
                <HeadingText>Write a Bio</HeadingText>
                <PromptText style={{ marginTop: Spacing.small }}>
                    Each guest brings a unique flavor to the Homecooked
                    experience.
                </PromptText>
                <TextField
                    tintColor={Color.gray}
                    label="Bio"
                    value={this.displayBio()}
                    multiline={true}
                    maxLength={150}
                    onChangeText={bio => this.setState({ bio })}
                    blurOnSubmit={true}
                />

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

const mapStateToProps = state => {
    let { currentUser } = state;
    return {
        currentUser
    };
};

const mapDispatchToProps = dispatch => {
    const updateUser = changes => {
        dispatch({
            type: currentUserTypes.UPDATE_USER_REQUEST,
            payload: changes
        });
    };
    return {
        updateUser
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bio);

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
