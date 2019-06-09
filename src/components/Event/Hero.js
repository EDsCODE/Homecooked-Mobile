import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import MinorText from "Homecooked/src/components/Text/Minor";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class Hero extends Component {
    render() {
        let { title, chefName, chefDescription } = this.props;
        return (
            <View>
                <View style={styles.carousel} />
                <View style={styles.textContainer}>
                    <PrimaryText>{title}</PrimaryText>
                    <MinorText>{`Hosted by ${chefName}`}</MinorText>
                    <MinorText style={{ marginTop: Spacing.small }}>
                        {chefDescription}
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
