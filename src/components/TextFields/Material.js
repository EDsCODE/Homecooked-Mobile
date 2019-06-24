import React from "react";
import { TextField, TouchableOpacity } from "react-native-material-textfield";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const _TextField = props => {
    return (
        <TextField
            {...props}
            titleTextStyle={{
                ...props.titleTextStyle,
                fontFamily: Typography.fontFamily
            }}
            labelTextStyle={{
                ...props.labelTextStyle,
                fontFamily: Typography.fontFamily
            }}
        />
    );
};

export default _TextField;
