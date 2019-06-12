import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import MinorText from "Homecooked/src/components/Text/Minor";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import FloatyButton from "Homecooked/src/components/Buttons/FloatyButton";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import NavigationService from "Homecooked/src/utils/NavigationService";

import TextField from "Homecooked/src/components/TextFields/Material";
import LocationField from "Homecooked/src/components/TextFields/LocationAutocomplete";

export default class BasicInfo extends Component {
    state = {
        address: "",
        phoneNumber: ""
    };

    componentDidMount() {
        let { address, phoneNumber } = this.props.screenProps.state;
        this.setState({
            address,
            phoneNumber
        });
    }

    _goBack = () => {
        NavigationService.navigate("AccountMain");
    };

    _goNext = () => {
        let { address, phoneNumber } = this.state;
        this.props.screenProps.updateData("address", address);
        this.props.screenProps.updateData("phoneNumber", phoneNumber);
        this.props.navigation.navigate("ShortResponse");
    };

    render() {
        let { address, phoneNumber } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <MinorText>Step 1 of 3</MinorText>
                <HeadingText>Basic Information</HeadingText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    We phone screen our hosts to determine if you’re a right fit
                    for Homecooked.
                </PromptText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    Your location helps us gauge how many chefs are in your
                    area.
                </PromptText>
                <TextField
                    tintColor={Color.gray}
                    label="Address"
                    value={address}
                    onChangeText={address => this.setState({ address })}
                />
                <TextField
                    tintColor={Color.gray}
                    label="Phone Number"
                    value={phoneNumber}
                    keyboardType={"phone-pad"}
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                />
                <FloatyButton
                    onPress={this._goNext}
                    style={{
                        position: "absolute",
                        bottom: Spacing.largest,
                        right: Spacing.largest
                    }}
                    active={address && phoneNumber}
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
    }
});
