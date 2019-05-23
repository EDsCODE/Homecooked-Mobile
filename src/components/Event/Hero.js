import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import MinorText from "Homecooked/src/components/Text/Minor";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class Hero extends Component {
    render() {
        return (
            <View>
                <View style={styles.carousel} />
                <View style={styles.textContainer}>
                    <PrimaryText>Dimsum and Then Some</PrimaryText>
                    <MinorText>Hosted by Nick</MinorText>
                    <MinorText style={{ marginTop: Spacing.small }}>
                        Nick is a graduating senior at Yale passionate about
                        food sustainability and agriculture. He recently
                        returned from a gap year in Hong Kong and can’t wait to
                        share the incredible new recipes he picked up there!
                    </MinorText>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    carousel: {
        width: Spacing.deviceWidth,
        height: Spacing.deviceWidth,
        backgroundColor: "blue"
    },
    textContainer: {
        margin: Spacing.large
    }
});
