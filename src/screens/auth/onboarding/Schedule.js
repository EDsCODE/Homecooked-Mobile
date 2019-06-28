import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    Image,
    Dimensions,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-check-box';

import { Typography, Spacing, Color } from 'Homecooked/src/components/styles';
dinners = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

brunches = ['Saturday', 'Sunday'];

export default class Schedule extends Component {
    constructor() {
        super();
        let state = {
            dinner: {},
            brunch: {}
        };
        dinners.forEach(day => {
            state['dinner'][day] = false;
        });
        brunches.forEach(day => {
            state['brunch'][day] = false;
        });
        this.state = state;
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>
                    When would you like to connect over food?
                </Text>
                <Text style={styles.prompt}>
                    We’ll do our best to show you meals that align with your
                    schedule.
                </Text>
                <View style={styles.columnContainer}>
                    <View style={styles.column}>
                        <Text style={styles.columnTitle}>Dinners</Text>
                        {dinners.map(day => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            ['dinner']: {
                                                ...this.state['dinner'],
                                                [day]: !this.state['dinner'][
                                                    day
                                                ]
                                            },
                                            noRestric: false
                                        });
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 15
                                    }}
                                >
                                    <CheckBox
                                        style={{ paddingRight: 10 }}
                                        checkBoxColor={Color.lightGray}
                                        checkedCheckBoxColor={Color.orange}
                                        isChecked={this.state['dinner'][day]}
                                        onClick={() => {
                                            this.setState({
                                                ['dinner']: {
                                                    ...this.state['dinner'],
                                                    [day]: !this.state[
                                                        'dinner'
                                                    ][day]
                                                },
                                                noRestric: false
                                            });
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Avenir',
                                            fontSize: 16,
                                            fontWeight: '300'
                                        }}
                                    >
                                        {day}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.columnTitle}>Brunches</Text>
                        {brunches.map(day => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            ['brunch']: {
                                                ...this.state['brunch'],
                                                [day]: !this.state['brunch'][
                                                    day
                                                ]
                                            },
                                            noRestric: false
                                        });
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 15
                                    }}
                                >
                                    <CheckBox
                                        style={{ paddingRight: 10 }}
                                        checkBoxColor={Color.lightGray}
                                        checkedCheckBoxColor={Color.orange}
                                        isChecked={this.state['brunch'][day]}
                                        onClick={() => {
                                            this.setState({
                                                ['brunch']: {
                                                    ...this.state['brunch'],
                                                    [day]: !this.state[
                                                        'brunch'
                                                    ][day]
                                                },
                                                noRestric: false
                                            });
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Avenir',
                                            fontSize: 16,
                                            fontWeight: '300'
                                        }}
                                    >
                                        {day}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
                {isSomethingTrue(this.state.dinner) ||
                isSomethingTrue(this.state.brunch) ? (
                    <Text style={styles.note}>
                        Got it. The{' '}
                        <Text style={{ fontWeight: 'bold' }}>Gathr Feed </Text>
                        recommends events that best fit your schedule.
                    </Text>
                ) : null}
            </SafeAreaView>
        );
    }
}

// check if any value is dictionary is true
function isSomethingTrue(dictionary) {
    for (var key in dictionary) {
        if (dictionary[key]) {
            return true;
        }
    }
    return false;
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.largest,
        backgroundColor: Color.white,
        flex: 1
    },
    header: {
        ...Typography.screenHeader,
        marginTop: Spacing.larger
    },
    note: {
        ...Typography.bodyText,
        marginVertical: Spacing.large
    },
    columnContainer: {
        flexDirection: 'row'
    },
    column: {
        marginRight: Spacing.extraLarge
    },
    columnTitle: {
        ...Typography.header,
        marginBottom: Spacing.large
    },
    prompt: {
        ...Typography.prompt,
        marginVertical: Spacing.large
    }
});
