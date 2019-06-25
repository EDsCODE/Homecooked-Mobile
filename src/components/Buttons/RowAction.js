import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default props => (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
        <View style={[styles.container, { backgroundColor: props.color }]}>
            <Text adjustsFontSizeToFit={true} style={styles.buttonText}>
                {props.title}
            </Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        backgroundColor: Color.orange,
        padding: Spacing.smaller,
        paddingHorizontal: Spacing.smaller,
        alignSelf: "flex-start"
    },
    buttonText: {
        color: Color.white,
        fontFamily: Typography.fontFamily,
        fontWeight: Typography.heavy,
        fontSize: Typography.smallFontSize
    }
});
