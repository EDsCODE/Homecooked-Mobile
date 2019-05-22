import React from "react";
import { Text, StyleSheet } from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default props => (
    <Text style={[styles.text, { ...props.style }]}>{props.children}</Text>
);

const styles = StyleSheet.create({
    text: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.largeFontSize
    }
});
