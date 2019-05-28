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
        minGuestPickerVisible: false,
        maxGuestPickerVisible: false
    };

    componentDidMount() {
        let { minGuests, maxGuests } = this.props.screenProps.state;
        this.setState({
            minGuests,
            maxGuests
        });
    }

    _goNext = () => {
        let { minGuests, maxGuests } = this.state;
        this.props.screenProps.updateData("minGuests", minGuests);
        this.props.screenProps.updateData("maxGuests", maxGuests);
        this._goBack();
    };

    showMinPicker = () => {
        this.setState({
            minGuestPickerVisible: true
        });
    };

    showMaxPicker = () => {
        this.setState({
            maxGuestPickerVisible: true
        });
    };

    hideMinPicker = chosenValue => {
        this.setState({
            minGuestPickerVisible: false,
            minGuests: chosenValue
        });
    };

    hideMaxPicker = chosenValue => {
        this.setState({
            maxGuestPickerVisible: false,
            maxGuests: chosenValue
        });
    };

    getMaxItems = min => {
        let items = [];
        for (let i = min + 1; i < 8; i++) {
            items.push({
                label: `${i} people`,
                value: i
            });
        }
        return items;
    };

    render() {
        let {
            minGuests,
            maxGuests,
            minGuestPickerVisible,
            maxGuestPickerVisible
        } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>How many guests are you cooking for?</HeadingText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    Past experiences have shown the best conversations happen
                    around tables of 6-8.
                </PromptText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    If your event does not reach the minimum number of guests 24
                    hours before, the event will automatically be cancelled and
                    guests who have already paid willl be refunded.
                </PromptText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    Tip: Don’t forget to include yourself at the table! (5
                    guests + you = table of 6)
                </PromptText>
                <StaticField
                    label={"Minimum"}
                    value={`${minGuests} people`}
                    containerStyle={{ marginTop: Spacing.larger }}
                    onPress={this.showMinPicker}
                />
                <StaticField
                    label={"Maximum"}
                    value={`${maxGuests} people`}
                    containerStyle={{ marginVertical: Spacing.base }}
                    onPress={this.showMaxPicker}
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
                    visible={minGuestPickerVisible}
                    done={this.hideMinPicker}
                    items={this.getMaxItems(3)}
                />
                <Picker
                    visible={maxGuestPickerVisible}
                    done={this.hideMaxPicker}
                    items={this.getMaxItems(3)}
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
