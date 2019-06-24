import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import MinorText from "Homecooked/src/components/Text/Minor";

import TextField from "Homecooked/src/components/TextFields/Material";
import { Spacing, Color, Typography } from "Homecooked/src/components/styles";

import PhoneInput from "react-native-phone-input";
import BarButton from "Homecooked/src/components/Buttons/BarButton";

import { connect } from "react-redux";

class AccountInformation extends Component {
    state = {
        email: "",
        phoneNumber: "",
        password: ""
    };

    _navigateNext = () => {
        this.props.screenProps.updateData("email", this.state.email);
        this.props.navigation.navigate("Password");
    };

    _back = () => {
        this.props.navigation.goback();
    };

    _goNext = () => {
        let { email, phoneNumber, password } = this.state;
        this.props.screenProps.updateData(
            "account",
            {
                email,
                phoneNumber,
                password
            },
            () => {
                this.props.screenProps.submit();
            }
        );
    };

    render() {
        let { email, phoneNumberFormatted, password } = this.state;
        return (
            <View style={{ flex: 1, marginTop: 30 }}>
                <View style={styles.container}>
                    <CloseButton icon={"arrow-round-back"} />
                    <MinorText>Step 2 of 2</MinorText>
                    <HeadingText>Welcome to </HeadingText>
                    <PromptText>
                        We use your account info to send you updates and
                        receipts.
                    </PromptText>
                    <TextField
                        containerStyle={styles.input}
                        titleTextStyle={{ fontFamily: "Avenir" }}
                        labelTextStyle={{ fontFamily: "Avenir" }}
                        tintColor="#4A4A4A"
                        label="Email"
                        value={email}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextField
                        containerStyle={styles.input}
                        titleTextStyle={{ fontFamily: "Avenir" }}
                        labelTextStyle={{ fontFamily: "Avenir" }}
                        tintColor="#4A4A4A"
                        label="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={password => this.setState({ password })}
                    />
                    <MinorText style={{ marginTop: Spacing.larger }}>
                        Phone Number
                    </MinorText>
                    <PhoneInput
                        ref="phone"
                        onChangePhoneNumber={phoneNumber =>
                            this.setState({ phoneNumber })
                        }
                        textStyle={{ fontFamily: Typography.fontFamily }}
                        style={{
                            borderWidth: 1,
                            padding: Spacing.smaller,
                            paddingVertical: Spacing.small,
                            borderRadius: 6,
                            borderColor: Color.lightGray
                        }}
                        textProps={{ returnKeyType: "done" }}
                    />
                </View>
                <BarButton
                    title="Submit"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.green}
                    fill={Color.green}
                    onPress={this._goNext}
                    loading={this.props.loading}
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

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    };
};

export default connect(
    mapStateToProps,
    null
)(AccountInformation);
