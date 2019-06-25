import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import MinorText from "Homecooked/src/components/Text/Minor";
import FloatyButton from "Homecooked/src/components/Buttons/FloatyButton";
import FieldButton from "Homecooked/src/components/TextFields/Button";

import TextField from "Homecooked/src/components/TextFields/Material";
import ClickableField from "Homecooked/src/components/TextFields/ClickableMaterial";

import Header from "Homecooked/src/components/Headers/Basic";
import { Spacing, Color } from "Homecooked/src/components/styles";

import NavigationService from "Homecooked/src/utils/NavigationService";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

export default class Email extends Component {
    state = {
        firstName: "",
        lastName: "",
        isDateTimePickerVisible: false,
        dob: null
    };

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.setState({
            dob: date,
            formattedDOB: moment(date).format("MMMM D, YYYY")
        });
        this.hideDateTimePicker();
    };

    _back = () => {
        NavigationService.navigate("Landing");
    };

    _goNext = () => {
        let { firstName, lastName, dob } = this.state;
        this.props.screenProps.updateData("personal", {
            firstName,
            lastName,
            dob
        });
        this.props.navigation.navigate("AccountInformation");
    };

    render() {
        let { formattedDOB, lastName, firstName } = this.state;
        return (
            <View style={{ flex: 1, marginTop: 30 }}>
                <View style={styles.container}>
                    <CloseButton icon={"arrow-round-back"} />
                    <MinorText>Step 1 of 2</MinorText>
                    <HeadingText>Welcome to </HeadingText>
                    <PromptText>
                        Let's get started with some basic information
                    </PromptText>
                    <TextField
                        containerStyle={styles.input}
                        titleTextStyle={{ fontFamily: "Avenir" }}
                        labelTextStyle={{ fontFamily: "Avenir" }}
                        tintColor="#4A4A4A"
                        label="First name"
                        value={firstName}
                        onChangeText={firstName => this.setState({ firstName })}
                    />
                    <TextField
                        containerStyle={styles.input}
                        titleTextStyle={{ fontFamily: "Avenir" }}
                        labelTextStyle={{ fontFamily: "Avenir" }}
                        tintColor="#4A4A4A"
                        label="Last name"
                        value={lastName}
                        onChangeText={lastName => this.setState({ lastName })}
                    />
                    <ClickableField
                        containerStyle={styles.input}
                        titleTextStyle={{ fontFamily: "Avenir" }}
                        labelTextStyle={{ fontFamily: "Avenir" }}
                        tintColor="#4A4A4A"
                        label="Date of Birth"
                        value={formattedDOB}
                        onPress={this.showDateTimePicker}
                    />
                </View>
                <FloatyButton
                    onPress={this._goNext}
                    style={{
                        position: "absolute",
                        bottom: Spacing.largest,
                        right: Spacing.largest
                    }}
                    active={formattedDOB && lastName && firstName}
                />
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.white,
        flex: 1,
        marginHorizontal: Spacing.large
    }
});
