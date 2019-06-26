import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import { Spacing, Color, Typography } from "Homecooked/src/components/styles";

import PhoneInput from "react-native-phone-input";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import NavigationService from "Homecooked/src/utils/NavigationService";

import { connect } from "react-redux";

export default class AttendanceConfirmation extends Component {
    _goNext = () => {
        NavigationService.navigate("HostTablesMain");
    };

    render() {
        return (
            <View style={{ flex: 1, marginTop: 70 }}>
                <View style={styles.container}>
                    <HeadingText>Thank you! </HeadingText>
                    <PromptText>
                        Your event has been officially closed and guests who
                        attended will be prompted to leave you a rating.
                    </PromptText>
                </View>
                <BarButton
                    title="Finish"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.green}
                    fill={Color.green}
                    onPress={this._goNext}
                    loading={this.props.loading}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.white,
        flex: 1,
        marginHorizontal: Spacing.large
    }
});
