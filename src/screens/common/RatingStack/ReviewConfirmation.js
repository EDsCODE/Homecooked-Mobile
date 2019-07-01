import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import PromptText from "Homecooked/src/components/Text/Prompt";
import BarButton from "Homecooked/src/components/Buttons/BarButton";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class ReviewConfirmation extends Component {
    _goNext = () => {
        this.props.navigation.navigate("HistoryMain");
    };
    render() {
        return (
            <View style={styles.container}>
                <PrimaryText style={{ marginTop: Spacing.small }}>
                    Thank you for leaving a review
                </PrimaryText>

                <PromptText
                    style={{
                        marginTop: Spacing.small,
                        textAlign: "center",
                        marginHorizontal: Spacing.large
                    }}
                >
                    Reviews help our hosts understand what they're doing well
                    and where there's still room for improvement
                </PromptText>
                <BarButton
                    title="Return to my tables"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.orange}
                    fill={Color.orange}
                    onPress={this._goNext}
                    loading={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
