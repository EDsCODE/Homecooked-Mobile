import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Button } from "react-native";

import Header from "Homecooked/src/components/Headers/Basic";
import NavigationService from "Homecooked/src/utils/NavigationService";

import { currentUserTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import { createToken, formatCardDetails } from "Homecooked/src/services/stripe";
import { LiteCreditCardInput } from "react-native-credit-card-input";

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
        let details = formatCardDetails(this.state.cardDetails.values);
        try {
            let token = await createToken(details);
            console.log(token);
            this.props.savePaymentInfo(token.id);
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <View>
                <Header title={"Payment"} leftOnPress={this._goBack} />
                <LiteCreditCardInput onChange={this._onChange} />
                <Button title={"Submit"} onPress={this._onPress} />
            </View>
        );
    }
}

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
