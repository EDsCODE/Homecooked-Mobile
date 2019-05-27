import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import StaticField from "Homecooked/src/components/TextFields/Static";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class Time extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    state = {
        minGuests: 0,
        maxGuests: 0
    };

    componentDidMount() {
        let { minGuests, maxGuests } = this.props.screenProps.state;
        this.setState({
            minGuests,
            maxGuests
        });
    }

    _goNext = () => {
        let { eventDescription } = this.state;
        this.props.screenProps.updateData("eventDescription", eventDescription);
        this._goBack();
    };

    render() {
        let { minGuests, maxGuests } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>How long is your event?</HeadingText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    Most Homecooked meals officially last about an hour and a
                    half. You are more than welcome to encourage to guests to
                    stay after the event.
                </PromptText>
                <StaticField
                    label={"Start Time"}
                    value={0}
                    containerStyle={{ marginTop: Spacing.larger }}
                />
                <StaticField
                    label={"End Time"}
                    value={5}
                    containerStyle={{ marginVertical: Spacing.base }}
                />
                <BarButton
                    title="Confirm"
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
        paddingTop: 30,
        paddingHorizontal: Spacing.large
    },
    input: {
        marginHorizontal: Spacing.large
    }
});
