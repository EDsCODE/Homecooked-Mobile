import React, { Component } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default props => (
    <View
        style={[
            {
                flexDirection: "row",
                alignItems: "center"
            },
            props.containerStyle
        ]}
    >
        {props.people.map((person, index) => (
            <Image
                source={person.imageUri}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    position: "absolute",
                    zIndex: props.people.length - index,
                    left: index * 25
                }}
            />
        ))}
    </View>
);
