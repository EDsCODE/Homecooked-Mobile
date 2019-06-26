import React from "react";
import { TouchableWithoutFeedback, View, Text } from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import { Icon } from "react-native-elements";

export default props => (
    <TouchableWithoutFeedback
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        onPress={props.onPress}
    >
        <Icon
            name={`ios-${props.icon || "close"}`}
            type="ionicon"
            color={props.color ? props.color : Color.gray}
            size={55}
            containerStyle={{
                alignSelf: "flex-start"
            }}
        />
    </TouchableWithoutFeedback>
);
