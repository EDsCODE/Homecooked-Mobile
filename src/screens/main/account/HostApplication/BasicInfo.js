import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    Keyboard
} from 'react-native';

import HeadingText from 'Homecooked/src/components/Text/Heading';
import PromptText from 'Homecooked/src/components/Text/Prompt';
import MinorText from 'Homecooked/src/components/Text/Minor';
import CloseButton from 'Homecooked/src/components/Buttons/Close';
import FloatyButton from 'Homecooked/src/components/Buttons/FloatyButton';
import { connect } from 'react-redux';

import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';
import NavigationService from 'Homecooked/src/utils/NavigationService';

import {
    getPossibleMatches,
    getPlaceDetails
} from 'Homecooked/src/services/location';
import PhoneInput from 'react-native-phone-input';

import TextField from 'Homecooked/src/components/TextFields/Material';

class BasicInfo extends Component {
    state = {
        query: '',
        results: [],
        selected: null,
        phoneNumber: '',
        phoneError: ''
    };

    componentDidMount() {
        this.setState({
            phoneNumber: this.props.phoneNumber
        });
    }

    _goBack = () => {
        NavigationService.navigate('AccountMain');
    };

    _goNext = () => {
        let { phoneNumber, selected } = this.state;

        if (!this.phone.isValidNumber()) {
            this.setState({
                phoneError: 'Please enter a valid phone number'
            });
            return;
        } else {
            this.setState({
                phoneError: ''
            });
        }

        this.props.screenProps.updateData('address', selected);
        this.props.screenProps.updateData('phoneNumber', phoneNumber);
        this.props.navigation.navigate('ShortResponse');
    };

    onChangeText = async query => {
        this.setState({
            query
        });
        if (query.length > 1) {
            let results = await getPossibleMatches(
                query,
                this.state.sessionToken
            );
            results;
            this.setState({
                results
            });
        } else if (query.length == 0) {
            this.setState({
                results: []
            });
        }
    };

    onRowPressed = async item => {
        let data = await getPlaceDetails(
            item.place_id,
            this.state.sessionToken
        );
        data;
        this.setState({
            query: data.formattedAddress,
            results: [],
            selected: data
        });
        Keyboard.dismiss();
    };

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                key={item.description}
                onPress={() => this.onRowPressed(item)}
            >
                <Text
                    style={{
                        fontFamily: Typography.fontFamily,
                        marginVertical: Spacing.smallest
                    }}
                >
                    {item.description}
                </Text>
            </TouchableOpacity>
        );
    };

    _keyExtractor = (item, index) => item.description;

    render() {
        let { phoneNumber, query, results, selected } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <MinorText>Step 1 of 3</MinorText>
                <HeadingText>Basic Information</HeadingText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    We phone screen our hosts to determine if you’re a right fit
                    for gathr.
                </PromptText>
                <PromptText style={{ marginTop: Spacing.large }}>
                    Your location helps us gauge how many chefs are in your
                    area.
                </PromptText>
                <TextField
                    label={''}
                    tintColor="#4A4A4A"
                    placeholder="Address"
                    multiline={true}
                    value={query}
                    returnKeyType="done"
                    blurOnSubmit={true}
                    onChangeText={this.onChangeText}
                />
                {results.length != 0 ? (
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        data={results}
                        renderItem={this.renderItem}
                        keyboardShouldPersistTaps={'handled'}
                    />
                ) : null}
                <MinorText
                    style={{
                        marginTop: Spacing.larger,
                        marginBottom: Spacing.smallest
                    }}
                >
                    Phone Number
                </MinorText>
                <PhoneInput
                    ref={ref => (this.phone = ref)}
                    onChangePhoneNumber={phoneNumber =>
                        this.setState({ phoneNumber })
                    }
                    value={this.state.phoneNumber}
                    textStyle={{ fontFamily: Typography.fontFamily }}
                    style={{
                        borderWidth: 1,
                        padding: Spacing.smaller,
                        paddingVertical: Spacing.small,
                        borderRadius: 6,
                        borderColor: Color.lightGray
                    }}
                    textProps={{ returnKeyType: 'done' }}
                />
                <PromptText style={{ fontSize: 14, color: Color.red }}>
                    {this.state.phoneError}
                </PromptText>
                <FloatyButton
                    onPress={this._goNext}
                    style={{
                        position: 'absolute',
                        bottom: Spacing.largest,
                        right: Spacing.largest
                    }}
                    active={selected && phoneNumber}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        phoneNumber: state.currentUser.phoneNumber
    };
};

export default connect(
    mapStateToProps,
    null
)(BasicInfo);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: Spacing.large
    }
});
