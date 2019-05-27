import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import NavigationService from "Homecooked/src/utils/NavigationService";
import HeadingText from "Homecooked/src/components/Text/Heading";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import InfoSection from "Homecooked/src/components/Event/Info";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class Review extends Component {
    state = {
        modules: ["dateTime", "price"]
    };
    _goBack = () => {
        NavigationService.navigate("Event");
    };

    _goNext = () => {
        this.props.navigation.navigate("Confirmed");
    };

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 30 }}>
                <View style={styles.headerContainer}>
                    <CloseButton onPress={this._goBack} />
                    <HeadingText>Review</HeadingText>
                </View>
                <InfoSection modules={this.state.modules} />
                <BarButton
                    title="RSVP"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.green}
                    fill={Color.green}
                    onPress={this._goNext}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: Spacing.large
    }
});
