import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import NavigationService from "Homecooked/src/utils/NavigationService";
import HeadingText from "Homecooked/src/components/Text/Heading";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import FloatyButton from "Homecooked/src/components/Buttons/FloatyButton";
import InfoSection from "Homecooked/src/components/Event/Info";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class Confirmed extends Component {
    state = {
        modules: ["dateTime", "location", "reminder", "invite"]
    };
    _goBack = () => {
        NavigationService.navigate("Feed");
    };

    _goNext = () => {
        this.props.navigation.navigate("Photo");
    };

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 30 }}>
                <View style={styles.headerContainer}>
                    <CloseButton onPress={this._goBack} />
                    <HeadingText>Review</HeadingText>
                </View>
                <InfoSection modules={this.state.modules} />
                <FloatyButton
                    onPress={this._goNext}
                    style={{
                        position: "absolute",
                        bottom: Spacing.largest,
                        right: Spacing.largest
                    }}
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
