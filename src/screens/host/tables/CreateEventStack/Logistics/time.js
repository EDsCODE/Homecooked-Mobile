import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import HeadingText from 'Homecooked/src/components/Text/Heading';
import PromptText from 'Homecooked/src/components/Text/Prompt';
import CloseButton from 'Homecooked/src/components/Buttons/Close';
import BarButton from 'Homecooked/src/components/Buttons/BarButton';
import StaticField from 'Homecooked/src/components/TextFields/Static';
import Picker from 'Homecooked/src/components/Picker/Basic';
import DateTimePicker from 'react-native-modal-datetime-picker';

import moment from 'moment';

import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';

const durationItems = [
    {
        label: '1 hour',
        value: 1
    },
    {
        label: '1 hour and 30 minutes',
        value: 1.5
    },
    {
        label: '2 hours',
        value: 2
    }
];

export default class Time extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    state = {
        startTime: 0,
        duration: 0,
        isDateTimePickerVisible: false,
        durationPickerVisible: false
    };

    componentDidMount() {
        let { startTime, duration } = this.props.screenProps.state;
        this.setState({
            startTime,
            duration
        });
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = time => {
        this.setState({
            startTime: time
        });
        this.hideDateTimePicker();
    };

    showDurationPicker = () => {
        this.setState({
            durationPickerVisible: true
        });
    };

    hideDurationPicker = chosenValue => {
        this.setState({
            durationPickerVisible: false,
            duration: chosenValue
        });
    };

    _goNext = () => {
        let { startTime, duration } = this.state;
        this.props.screenProps.updateData('startTime', startTime);
        this.props.screenProps.updateData('duration', duration);
        this._goBack();
    };

    render() {
        let {
            startTime,
            duration,
            isDateTimePickerVisible,
            durationPickerVisible
        } = this.state;

        let parsedDuration = duration
            ? duration == 1
                ? '1 hour'
                : `${duration} hours`
            : '';
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <HeadingText>How long is your event?</HeadingText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    Most gathr meals officially last about an hour and a half.
                    You are more than welcome to encourage to guests to stay
                    after the event.
                </PromptText>
                <StaticField
                    label={'Start Time'}
                    value={startTime ? moment(startTime).format('hh:mm a') : ''}
                    containerStyle={{ marginTop: Spacing.larger }}
                    onPress={this.showDateTimePicker}
                />
                <StaticField
                    label={'Duration'}
                    value={parsedDuration}
                    containerStyle={{ marginVertical: Spacing.base }}
                    onPress={this.showDurationPicker}
                />
                <BarButton
                    title="Confirm"
                    style={{
                        position: 'absolute',
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.orange}
                    fill={Color.orange}
                    onPress={this._goNext}
                />
                <Picker
                    visible={durationPickerVisible}
                    done={this.hideDurationPicker}
                    items={durationItems}
                />
                <DateTimePicker
                    mode={'time'}
                    minuteInterval={30}
                    isVisible={isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
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
