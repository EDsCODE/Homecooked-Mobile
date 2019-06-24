import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

import FastImage from "react-native-fast-image";
import { Grayscale } from "react-native-color-matrix-image-filters";
import { Icon } from "react-native-elements";

const PROFILE_PLACEHOLDER_IMAGE = "Homecooked/src/assets/img/filledTable.jpg";

export const SelectableGrid = props => {
    return (
        <View style={GridStyles.container}>
            {props.data.map((item, index) => props.renderItem(item, index))}
        </View>
    );
};

const GridStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start"
    }
});

export const SelectableCell = props => {
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={1.0}>
            <View style={{ marginHorizontal: Spacing.larger / 6 }}>
                <Grayscale amount={props.selected ? 0 : 1}>
                    <Image
                        source={require(PROFILE_PLACEHOLDER_IMAGE)}
                        style={{
                            width: Spacing.deviceWidth / 3 - Spacing.larger,
                            height: Spacing.deviceWidth / 3 - Spacing.larger,
                            borderRadius:
                                (Spacing.deviceWidth / 3 - Spacing.larger) / 2,
                            marginTop: Spacing.base,
                            borderWidth: 4,
                            borderColor: props.selected
                                ? props.color
                                : Color.gray
                        }}
                    />
                </Grayscale>
                {props.selected ? (
                    <View
                        style={{
                            position: "absolute",
                            bottom: 15,
                            right: 0,
                            backgroundColor: props.color,
                            width: 35,
                            height: 35,
                            borderRadius: 35 / 2,
                            borderWidth: 4,
                            borderColor: Color.white,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Icon
                            name={"ios-" + props.selectedIconType}
                            type="ionicon"
                            size={props.iconSize}
                            color={Color.white}
                            containerStyle={{
                                top: 1
                            }}
                        />
                    </View>
                ) : null}
                <Text
                    style={{ marginTop: Spacing.smaller, alignSelf: "center" }}
                >
                    {props.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
