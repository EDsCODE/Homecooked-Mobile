import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet, Alert } from "react-native";
import { NavigationActions } from "react-navigation";
import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import NavigationService from "Homecooked/src/utils/NavigationService";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import TextField from "Homecooked/src/components/TextFields/Material";

import { hostTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

const placeHolderWidth = 140;

class Description extends Component {
    state = {
        description: ""
    };

    componentDidMount() {
        if (this.props.host.description) {
            this.setState({
                description: this.props.host.description
            });
        }
    }

    _goBack = () => {
        this.props.navigation.goBack();
    };

    _goNext = () => {
        if (this.state.description) {
            this.props.updateHost({
                description: this.state.description
            });
        }
        Alert.alert("Updated host profile", null, [
            {
                text: "Done",
                mode: "Cancel",
                onPress: () => NavigationService.navigate("HostSettingsMain")
            }
        ]);
    };

    render() {
        let { bio } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} icon={"arrow-round-back"} />
                <HeadingText>Write a Description</HeadingText>
                <PromptText style={{ marginTop: Spacing.small }}>
                    Let guests know who you are!
                </PromptText>
                <TextField
                    tintColor={Color.gray}
                    label="Description"
                    value={this.state.description}
                    multiline={true}
                    maxLength={200}
                    onChangeText={description => this.setState({ description })}
                    blurOnSubmit={true}
                />

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
    const updateHost = changes => {
        dispatch({
            type: hostTypes.UPDATE_HOST_REQUEST,
            payload: changes
        });
    };
    return {
        updateHost
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Description);

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
