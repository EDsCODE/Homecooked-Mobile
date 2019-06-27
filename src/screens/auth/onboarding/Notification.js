import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import PromptText from "Homecooked/src/components/Text/Prompt";
import BarButton from "Homecooked/src/components/Buttons/BarButton";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import { UrbanAirship } from "urbanairship-react-native";

export default class Notification extends Component {
    _goNext = () => {
        UrbanAirship.setUserNotificationsEnabled(true);
        this.props.navigation.navigate("Location");
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require("Homecooked/src/assets/img/GHNotifs.png")}
                    style={{ width: 50, height: 50 }}
                    resizeMode={"contain"}
                />
                <PrimaryText style={{ marginTop: Spacing.small }}>
                    Stay up to date
                </PrimaryText>

                <PromptText
                    style={{
                        marginTop: Spacing.small,
                        textAlign: "center",
                        marginHorizontal: Spacing.large
                    }}
                >
                    We let you know when nearby meals are happening
                </PromptText>
                <BarButton
                    title="Enable Notifications"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.orange}
                    fill={Color.orange}
                    onPress={this._goNext}
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
