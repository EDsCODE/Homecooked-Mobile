import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Circle } from "react-native-maps";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import PrimaryText from "Homecooked/src/components/Text/Primary";
import MinorText from "Homecooked/src/components/Text/Minor";

const GeneralizedMap = ({
    lat,
    lng,
    address = null,
    city = null,
    state = null,
    specialDirections = null
}) => {
    return (
        <View style={styles.container}>
            <PrimaryText>Location</PrimaryText>
            {address && city && state ? (
                <Text style={styles.info}>
                    {address + " " + city + ", " + state}
                </Text>
            ) : null}
            <MapView
                initialRegion={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221
                }}
                style={styles.map}
                scrollEnabled={false}
                zoomEnabled={false}
            >
                <Circle
                    center={{ latitude: lat, longitude: lng }}
                    radius={500}
                    strokeWidth={1}
                    strokeColor="black"
                    fillColor="rgba(0,0,0,0.5)"
                />
            </MapView>

            {specialDirections ? (
                <PrimaryText style={{ marginTop: Spacing.base }}>
                    Special Directions
                </PrimaryText>
            ) : null}
            <MinorText>{specialDirections}</MinorText>
        </View>
    );
};

export default GeneralizedMap;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.large,
        marginVertical: Spacing.large
    },
    map: {
        width: Spacing.deviceWidth - 50,
        height: 200,
        marginTop: 5
    },
    info: {
        fontFamily: "Avenir",
        fontWeight: "400",
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5
    }
});
