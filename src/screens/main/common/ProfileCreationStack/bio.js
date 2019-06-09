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

import { userTypes } from "Homecooked/src/modules/types";
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
        NavigationService.navigate("Event");
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
                    value={bio}
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

const mapDispatchToProps = dispatch => {
    const updateUser = userInput => {
        dispatch({
            type: userTypes.UPDATE_USER_REQUEST,
            payload: { userInput }
        });
    };
    return {
        updateUser
    };
};

export default connect(
    null,
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
