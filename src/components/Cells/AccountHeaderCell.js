import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const imageURI = "Homecooked/src/assets/img/filledTable.jpg";

export default props => {
    return (
        <View style={styles.row} key={props.key}>
            <Image style={styles.image} source={require(imageURI)} />
            <View style={styles.text}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.prompt}>Edit Profile</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 65,
        width: 65,
        borderRadius: 32.5
    },
    row: {
        flexDirection: "row",
        marginVertical: Spacing.base
    },
    text: {
        flexDirection: "column",
        marginLeft: Spacing.large,
        justifyContent: "center"
    },
    name: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.largeHeaderFontSize,
        fontWeight: Typography.heavy
    },
    prompt: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.baseFontSize
    }
});
