import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import SecondaryText from "Homecooked/src/components/Text/Secondary";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import { Icon } from "react-native-elements";

export default class CreditCardInput extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <SecondaryText style={{ marginRight: Spacing.smallest }}>
                        Card Number
                    </SecondaryText>
                    {this.props.valid ? (
                        <Icon
                            name="ios-checkmark"
                            type="ionicon"
                            size={40}
                            containerStyle={{
                                padding: 0,
                                margin: 0
                            }}
                            color={Color.green}
                        />
                    ) : (
                        <Icon
                            name="ios-checkmark"
                            type="ionicon"
                            size={40}
                            containerStyle={{
                                padding: 0,
                                margin: 0
                            }}
                            color={Color.white}
                        />
                    )}
                </View>
                <View style={styles.cardInputContainer}>
                    <LiteCreditCardInput
                        onChange={this.props.onChange}
                        additionalInputsProps={{
                            number: {
                                returnKeyType: "done"
                            },
                            expiry: {
                                returnKeyType: "done"
                            },
                            cvc: {
                                returnKeyType: "done"
                            }
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: Spacing.large,
        marginTop: Spacing.base
    },
    cardInputContainer: {
        borderWidth: 1,
        borderColor: Color.lightGray,
        borderRadius: 5,
        paddingTop: 2,
        paddingBottom: 4
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
});
