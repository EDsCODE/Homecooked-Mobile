import React from "react";
import { View } from "react-native";

import { Color } from "Homecooked/src/components/styles";

export default props => (
    <View
        style={{
            borderBottomColor: Color.lightGray,
            borderBottomWidth: 1,
            width: "100%",
            ...props.style
        }}
    />
);
