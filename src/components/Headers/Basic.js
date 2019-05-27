import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const BasicHeader = props => (
    <Header
        containerStyle={{
            backgroundColor: Color.white,
            justifyContent: "space-around"
        }}
        leftComponent={
            props.leftComponent ? (
                props.leftComponent
            ) : (
                <Icon
                    name="ios-arrow-round-back"
                    type="ionicon"
                    containerStyle={{ marginLeft: Spacing.base }}
                    size={40}
                    onPress={props.leftOnPress}
                />
            )
        }
        centerComponent={{
            text: props.title,
            style: { color: Color.black, fontFamily: Typography.fontFamily }
        }}
        rightComponent={
            props.rightComponent
                ? rightComponents[props.rightComponent](props)
                : null
        }
        props
    />
);

let rightComponents = {
    share: {
        icon: "home",
        color: Color.white
    },
    next: props => (
        <TouchableOpacity onPress={props.rightOnPress}>
            <Text
                style={{
                    color: Color.orange,
                    fontFamily: Typography.fontFamily,
                    marginRight: Spacing.smaller
                }}
            >
                Next
            </Text>
        </TouchableOpacity>
    ),
    new: props => (
        <Icon
            name="ios-add"
            type="ionicon"
            containerStyle={{ marginRight: Spacing.smaller }}
            size={30}
            color={Color.gray}
            onPress={props.rightOnPress}
        />
    )
};

export default BasicHeader;
