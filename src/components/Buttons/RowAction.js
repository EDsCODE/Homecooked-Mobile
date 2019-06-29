import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

// temporary static presentation
export default props => (
    <View style={styles.container}>
        <Text
            adjustsFontSizeToFit={true}
            style={[styles.buttonText, { color: props.color }]}
        >
            {props.title}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        alignSelf: "flex-start",
        marginTop: 5
    },
    buttonText: {
        fontFamily: Typography.fontFamily,
        fontWeight: Typography.heavy,
        fontSize: Typography.smallFontSize
    }
});
