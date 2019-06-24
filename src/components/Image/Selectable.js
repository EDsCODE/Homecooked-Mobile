import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

import FastImage from "react-native-fast-image";

const PROFILE_PLACEHOLDER_IMAGE = "Homecooked/src/assets/img/filledTable.jpg";

export const SelectableGrid = props => {
    return (
        <View style={GridStyles.container}>
            {props.data.map(item => props.renderItem({ item }))}
        </View>
    );
};

const GridStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    }
});

export const SelectableCell = props => {
    return (
        <View>
            <Image
                source={require(PROFILE_PLACEHOLDER_IMAGE)}
                style={{
                    width: Spacing.deviceWidth / 3 - Spacing.largest,
                    height: Spacing.deviceWidth / 3 - Spacing.largest,
                    borderRadius:
                        (Spacing.deviceWidth / 3 - Spacing.largest) / 2,
                    marginTop: Spacing.base,
                    borderWidth: 1,
                    borderColor: Color.gray
                }}
            />
            <Text>Hello</Text>
        </View>
    );
};
