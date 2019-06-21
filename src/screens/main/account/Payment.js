import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Button, Alert } from "react-native";

import Header from "Homecooked/src/components/Headers/Basic";
import NavigationService from "Homecooked/src/utils/NavigationService";

import { currentUserTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import { createToken, formatCardDetails } from "Homecooked/src/services/stripe";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import CreditCardInput from "Homecooked/src/components/TextFields/CreditCardInput";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

class Payment extends Component {
    state = {
        cardDetails: {}
    };

    _goBack = () => {
        NavigationService.navigate("AccountMain");
    };

    _onChange = form =>
        this.setState({
            cardDetails: form
        });

    _onPress = async () => {
        if (this.state.cardDetails.valid) {
            let details = formatCardDetails(this.state.cardDetails.values);
            try {
                let token = await createToken(details);
                this.props.savePaymentInfo(token.id);
            } catch (error) {
                console.log(error);
            }
        } else {
            Alert.alert("Invalid Card Details");
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Header title={"Payment"} leftOnPress={this._goBack} />
                <CreditCardInput
                    onChange={this._onChange}
                    valid={this.state.cardDetails.valid}
                />
                <BarButton
                    style={{ marginTop: Spacing.base, alignSelf: "center" }}
                    title="Submit"
                    borderColor={Color.green}
                    fill={Color.green}
                    onPress={this._onPress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    }
});

const mapDispatchToProps = dispatch => {
    const savePaymentInfo = token => {
        dispatch({
            type: currentUserTypes.SAVE_PAYMENT_REQUEST,
            payload: {
                token
            }
        });
    };
    return {
        savePaymentInfo
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Payment);
