import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import { Icon } from "react-native-elements";

export default props => (
    <Icon
        name={`ios-${props.icon || "close"}`}
        type="ionicon"
        color={props.color ? props.color : Color.gray}
        size={55}
        containerStyle={{
            alignSelf: "flex-start"
        }}
        onPress={props.onPress}
    />
);
