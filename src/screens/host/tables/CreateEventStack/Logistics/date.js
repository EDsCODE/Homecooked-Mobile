import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import HeadingText from "Homecooked/src/components/Text/Heading";
import PromptText from "Homecooked/src/components/Text/Prompt";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import TextField from "Homecooked/src/components/TextFields/Material";
import CalendarPicker from "react-native-calendar-picker";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const HEADER_TEXT = "What day is your event happening?";
const PROMPT_TEXT = "Most Homecooked meals are scheduled 10 days in advance.";

export default class Date extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    state = {
        date: null
    };

    onDateChange = date => {
        this.setState({
            date: date
        });
    };

    _goNext = () => {
        let { date } = this.state;
        this.props.screenProps.updateData("date", date);
        this._goBack();
    };

    render() {
        let minDate = moment().add(2, "days");
        let maxDate = moment().add(20, "days");
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>{HEADER_TEXT}</HeadingText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    {PROMPT_TEXT}
                </PromptText>
                <CalendarPicker
                    style={{ width: "100%" }}
                    onDateChange={this.onDateChange}
                    selectedDayColor={Color.orange}
                    minDate={minDate}
                    maxDate={maxDate}
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
