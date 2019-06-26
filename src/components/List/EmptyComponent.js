import React, { Component } from "react";
import { View } from "react-native";
import TitleText from "Homecooked/src/components/Text/Title";

export default (EmptyComponent = props => {
    return (
        <View style={{ marginTop: "50%" }}>
            <TitleText style={{ alignSelf: "center" }}>
                {props.children}
            </TitleText>
        </View>
    );
});
