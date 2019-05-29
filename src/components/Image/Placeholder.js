import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import MinorText from "Homecooked/src/components/Text/Minor";

const Placeholder = props => (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
        {props.source.uri ? (
            <Image
                resizeMode={"cover"}
                style={{ flex: 1 }}
                source={props.source}
            />
        ) : (
            <View style={styles.outerSquare}>
                <View style={styles.innerSquare}>
                    <MinorText>{props.caption}</MinorText>
                </View>
            </View>
        )}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    outerSquare: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: Color.lightestGray,
        justifyContent: "center",
        alignItems: "center"
    },
    innerSquare: {
        width: "90%",
        height: "90%",
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Color.lightGray,
        backgroundColor: Color.white,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Placeholder;
