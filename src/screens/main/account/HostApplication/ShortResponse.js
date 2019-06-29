import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

import HeadingText from 'Homecooked/src/components/Text/Heading';
import PromptText from 'Homecooked/src/components/Text/Prompt';
import MinorText from 'Homecooked/src/components/Text/Minor';
import CloseButton from 'Homecooked/src/components/Buttons/Close';
import FloatyButton from 'Homecooked/src/components/Buttons/FloatyButton';
import SecondaryText from 'Homecooked/src/components/Text/Secondary';

import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';
import NavigationService from 'Homecooked/src/utils/NavigationService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextField from 'Homecooked/src/components/TextFields/Material';

export default class ShortResponse extends Component {
    state = {
        reason: '',
        experience: ''
    };

    componentDidMount() {
        let { reason, experience } = this.props.screenProps.state;
        this.setState({
            reason,
            experience
        });
    }

    _goBack = () => {
        this.props.navigation.goBack();
    };

    _goNext = () => {
        let { reason, experience } = this.state;
        this.props.screenProps.updateData('reason', reason);
        this.props.screenProps.updateData('experience', experience);
        this.props.navigation.navigate('Photos');
    };

    render() {
        let { reason, experience } = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    extraScrollHeight={100}
                    extraHeight={50}
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <CloseButton onPress={this._goBack} />
                    <MinorText>Step 2 of 3</MinorText>
                    <HeadingText>Short Response</HeadingText>
                    <PromptText style={{ marginTop: Spacing.large }}>
                        Our cooks range from Syrian refugees to food
                        entrepreneurs to grad students who love to cook.
                    </PromptText>
                    <PromptText style={{ marginTop: Spacing.large }}>
                        The one thing they have in common is a passion for
                        building community through food.
                    </PromptText>
                    <SecondaryText style={{ marginTop: Spacing.large }}>
                        What's your cooking experience?
                    </SecondaryText>
                    <TextField
                        multiline={true}
                        containerStyle={{ marginTop: -20 }}
                        tintColor={Color.gray}
                        placeholder="Your answer"
                        value={experience}
                        onChangeText={experience =>
                            this.setState({ experience })
                        }
                        returnKeyType="done"
                        scrollEnabled={true}
                        blurOnSubmit={true}
                        enablesReturnKeyAutomatically={true}
                    />
                    <SecondaryText style={{ marginTop: Spacing.base }}>
                        Tell us why you want to host?
                    </SecondaryText>
                    <TextField
                        multiline={true}
                        containerStyle={{ marginTop: -20 }}
                        tintColor={Color.gray}
                        placeholder="Your answer"
                        value={reason}
                        returnKeyType="done"
                        scrollEnabled={true}
                        blurOnSubmit={true}
                        enablesReturnKeyAutomatically={true}
                        onChangeText={reason => this.setState({ reason })}
                    />
                </KeyboardAwareScrollView>
                <FloatyButton
                    onPress={this._goNext}
                    style={{
                        position: 'absolute',
                        bottom: Spacing.largest,
                        right: Spacing.largest
                    }}
                    active={reason && experience}
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
    }
});
