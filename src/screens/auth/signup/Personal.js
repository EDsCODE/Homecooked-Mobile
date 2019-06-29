import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Keyboard,
    Alert
} from "react-native";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import NavigationService from "Homecooked/src/utils/NavigationService";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

const GATHR_LOGO = require("Homecooked/src/assets/img/OrangeTextLogoNEW.png");

export default class Email extends Component {
    state = {
        firstName: "",
        lastName: "",
        isDateTimePickerVisible: false,
        dob: null
    };

    showDateTimePicker = () => {
        Keyboard.dismiss();
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
        let now = moment();
        let dobDate = moment(dob);
        let diff = now.diff(dob, "years");
        if (diff < 18) {
            Alert.alert("Users must be 18 years or older to use this app");
            return;
        }
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
                    <KeyboardAwareScrollView
                        extraScrollHeight={50}
                        extraHeight={50}
                        keyboardShouldPersistTaps={"handled"}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                    >
                        <CloseButton
                            icon={"arrow-round-back"}
                            onPress={this._back}
                        />
                        <MinorText>Step 1 of 2</MinorText>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <HeadingText>Welcome to</HeadingText>
                            <Image
                                source={GATHR_LOGO}
                                style={{
                                    height: 60,
                                    width: 100,
                                    marginLeft: Spacing.smallest
                                }}
                                resizeMode={"contain"}
                            />
                        </View>
                        {/* <View
                        style={{
                            alignContent: 'center',
                            justifyContent: 'center'
                        }}
                    > */}
                        <PromptText style={{ marginBottom: 60 }}>
                            Let's get started with some basic information
                        </PromptText>
                        <TextField
                            containerStyle={styles.input}
                            titleTextStyle={{ fontFamily: "Avenir" }}
                            labelTextStyle={{ fontFamily: "Avenir" }}
                            tintColor="#4A4A4A"
                            label="First name"
                            value={firstName}
                            onChangeText={firstName =>
                                this.setState({ firstName })
                            }
                        />
                        <TextField
                            containerStyle={styles.input}
                            titleTextStyle={{ fontFamily: "Avenir" }}
                            labelTextStyle={{ fontFamily: "Avenir" }}
                            tintColor="#4A4A4A"
                            label="Last name"
                            value={lastName}
                            onChangeText={lastName =>
                                this.setState({ lastName })
                            }
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
                    </KeyboardAwareScrollView>
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
