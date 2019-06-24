import React from "react";
import { TouchableOpacity } from "react-native";
import { TextField } from "react-native-material-textfield";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const _TextField = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <TextField
                {...props}
                editable={false}
                titleTextStyle={{
                    ...props.titleTextStyle,
                    fontFamily: Typography.fontFamily
                }}
                labelTextStyle={{
                    ...props.labelTextStyle,
                    fontFamily: Typography.fontFamily
                }}
            />
        </TouchableOpacity>
    );
};

export default _TextField;
