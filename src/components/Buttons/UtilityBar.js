import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default props => (
    <View style={[styles.bar, props.style]}>
        <View style={styles.textContainer}>
            <Text style={[styles.price, { color: props.mainTextColor }]}>
                {props.mainText}
            </Text>
            <Text style={styles.subInfo}>{props.subText}</Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={props.onPress}>
                <View
                    style={[
                        styles.button,
                        { backgroundColor: props.buttonColor }
                    ]}
                >
                    <Text style={styles.buttonText}>{props.buttonText}</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    bar: {
        width: Spacing.deviceWidth,
        height: 75,
        backgroundColor: Color.white,
        paddingHorizontal: Spacing.large,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        zIndex: 1,
        borderTopWidth: 1,
        borderColor: Color.lightestGray
    },
    textContainer: {
        flex: 3,
        flexDirection: "column"
    },
    buttonContainer: {
        flex: 2,
        alignItems: "flex-end"
    },
    button: {
        borderRadius: 5,
        backgroundColor: "red",
        padding: Spacing.small,
        paddingHorizontal: Spacing.larger
    },
    price: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.baseFontSize,
        fontWeight: Typography.heavy
    },
    buttonText: {
        color: Color.white,
        fontFamily: Typography.fontFamily,
        fontWeight: Typography.heavy,
        fontSize: Typography.baseFontSize
    },
    subInfo: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.smallFontSize,
        color: Color.lightGray
    }
});
