import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import StaticField from "Homecooked/src/components/TextFields/Static";
import Picker from "Homecooked/src/components/Picker/Basic";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class Guests extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    state = {
        minGuests: 0,
        maxGuests: 0,
        pickerVisible: false
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

    showPicker = () => {
        this.setState({
            pickerVisible: true
        });
    };

    hidePicker = () => {
        this.setState({
            pickerVisible: false
        });
    };

    render() {
        let { minGuests, maxGuests, pickerVisible } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>How much does your event cost?</HeadingText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    Typical meals range between $15-25/person.
                </PromptText>
                <StaticField
                    label={"Price"}
                    value={"$0"}
                    containerStyle={{ marginTop: Spacing.larger }}
                    onPress={this.showPicker}
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
                <Picker
                    visible={this.state.pickerVisible}
                    done={this.hidePicker}
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
