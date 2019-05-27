import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const Button = props => (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
        <View
            style={{
                height: 30,
                borderRadius: 15,
                borderColor: props.borderColor || Color.transparent,
                backgroundColor: props.fill || Color.transparent,
                borderWidth: 2,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: Spacing.small,
                paddingVertical: Spacing.smallest
            }}
        >
            <Text
                style={{
                    color: props.textColor || Color.white,
                    fontSize: Typography.smallestFontSize,
                    fontFamily: Typography.fontFamily,
                    fontWeight: Typography.heavy
                }}
            >
                {props.title}
            </Text>
        </View>
    </TouchableOpacity>
);

export default Button;
