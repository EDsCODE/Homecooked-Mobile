import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import { Icon } from "react-native-elements";

export default props => (
    <Icon
        name="ios-close"
        type="ionicon"
        color={Color.gray}
        size={55}
        containerStyle={{
            alignSelf: "flex-start"
        }}
        onPress={props.onPress}
    />
);
