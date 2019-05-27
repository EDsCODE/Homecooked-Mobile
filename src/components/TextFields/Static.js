import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const StaticField = props => (
    <View style={props.containerStyle}>
        <TouchableOpacity
            style={styles.container}
            activeOpacity={1.0}
            onPress={props.onPress}
        >
            <View
                style={[
                    styles.innerContainer,
                    { justifyContent: "flex-start" }
                ]}
            >
                <Text style={styles.label}>{props.label}</Text>
            </View>
            <View
                style={[styles.innerContainer, { justifyContent: "flex-end" }]}
            >
                <Text style={styles.value}>{props.value}</Text>
            </View>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    innerContainer: {
        width: "50%",
        flexDirection: "row"
    },
    label: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.largeHeaderFontSize
    },
    value: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.headerFontSize,
        marginRight: Spacing.small,
        color: Color.gray
    }
});

export default StaticField;
