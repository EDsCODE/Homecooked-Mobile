import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import FastImage from "react-native-fast-image";
const imageURI = "Homecooked/src/assets/img/filledTable.jpg";

const PROFILE_PLACEHOLDER_IMAGE = "Homecooked/src/assets/img/Profile.png";

export default props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.row}>
                {props.source ? (
                    <FastImage
                        style={styles.image}
                        source={{
                            uri: props.source,
                            priority: FastImage.priority.normal
                        }}
                    />
                ) : (
                    <Image
                        style={styles.image}
                        source={require(PROFILE_PLACEHOLDER_IMAGE)}
                    />
                )}
                <View style={styles.text}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.prompt}>
                        {props.prompt ? props.prompt : "Edit Profile"}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 65,
        width: 65,
        borderRadius: 32.5
    },
    row: {
        flexDirection: "row",
        marginVertical: Spacing.base
    },
    text: {
        flexDirection: "column",
        marginLeft: Spacing.large,
        justifyContent: "center"
    },
    name: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.largeHeaderFontSize,
        fontWeight: Typography.heavy
    },
    prompt: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.baseFontSize
    }
});
