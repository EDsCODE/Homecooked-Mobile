import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import SecondaryText from "Homecooked/src/components/Text/Secondary";
import MinorText from "Homecooked/src/components/Text/Minor";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import { Icon } from "react-native-elements";

export default class Info extends Component {
    render() {
        return (
            <View style={styles.container}>
                {modules["dateTime"](this.props)}
                {modules["description"](this.props)}
                {modules["location"](this.props)}
                {modules["refundPolicy"](this.props)}
            </View>
        );
    }
}

const modules = {
    dateTime: props => (
        <View style={styles.rowContainer}>
            <View>
                <Icon
                    name="ios-calendar"
                    type="ionicon"
                    size={30}
                    containerStyle={{ width: 25, justifyContent: "center" }}
                />
            </View>
            <View
                style={{
                    flexDirection: "column",
                    marginHorizontal: Spacing.large
                }}
            >
                <SecondaryText>Date and Time</SecondaryText>
                <MinorText style={{ marginTop: Spacing.small }}>
                    Sunday, March 31st
                </MinorText>
                <MinorText>11:00 am - 12:30 pm</MinorText>
            </View>
        </View>
    ),
    description: props => (
        <View style={styles.rowContainer}>
            <View>
                <Icon
                    name="ios-clipboard"
                    type="ionicon"
                    size={30}
                    containerStyle={{ width: 25, justifyContent: "center" }}
                />
            </View>
            <View
                style={{
                    flexDirection: "column",
                    marginHorizontal: Spacing.large
                }}
            >
                <SecondaryText>Description</SecondaryText>
                <MinorText style={{ marginTop: Spacing.small }}>
                    I spent 3 months interning with a Chinese shifu in Hong
                    Kong! Come try the fruits of my labor!
                </MinorText>
            </View>
        </View>
    ),
    location: props => (
        <View style={styles.rowContainer}>
            <View>
                <Icon
                    name="ios-pin"
                    type="ionicon"
                    size={30}
                    containerStyle={{ width: 25, justifyContent: "center" }}
                />
            </View>
            <View
                style={{
                    flexDirection: "column",
                    marginHorizontal: Spacing.large
                }}
            >
                <SecondaryText>Location</SecondaryText>
                <MinorText style={{ marginTop: Spacing.small }}>
                    I spent 3 months interning with a Chinese shifu in Hong
                    Kong! Come try the fruits of my labor!
                </MinorText>
            </View>
        </View>
    ),
    refundPolicy: props => (
        <View style={styles.rowContainer}>
            <View>
                <Icon
                    name="ios-clipboard"
                    type="ionicon"
                    size={30}
                    containerStyle={{ width: 25, justifyContent: "center" }}
                />
            </View>
            <View
                style={{
                    flexDirection: "column",
                    marginHorizontal: Spacing.large
                }}
            >
                <SecondaryText>Refund Policy</SecondaryText>
                <MinorText style={{ marginTop: Spacing.small }}>
                    Refundable up to 2 days before event
                </MinorText>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.large,
        marginVertical: Spacing.large
    },
    rowContainer: {
        marginTop: Spacing.base,
        flexDirection: "row"
    },
    textContainer: {
        margin: Spacing.large
    }
});
