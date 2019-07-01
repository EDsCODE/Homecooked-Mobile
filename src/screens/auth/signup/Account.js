import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CloseButton from 'Homecooked/src/components/Buttons/Close';
import HeadingText from 'Homecooked/src/components/Text/Heading';
import PromptText from 'Homecooked/src/components/Text/Prompt';
import MinorText from 'Homecooked/src/components/Text/Minor';

import TextField from 'Homecooked/src/components/TextFields/Material';
import { Spacing, Color, Typography } from 'Homecooked/src/components/styles';

import PhoneInput from 'react-native-phone-input';
import BarButton from 'Homecooked/src/components/Buttons/BarButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import NavigationService from 'Homecooked/src/utils/NavigationService';

import { UserService } from 'Homecooked/src/services/api';

const GATHR_LOGO = require('Homecooked/src/assets/img/OrangeTextLogoNEW.png');

class AccountInformation extends Component {
    state = {
        email: '',
        emailError: '',
        phoneNumber: '',
        password: '',
        phoneError: '',
        loading: false
    };

    _back = () => {
        this.props.navigation.navigate('PersonalInformation');
    };

    _goNext = async () => {
        this.setState({
            emailError: '',
            phoneError: '',
            loading: true
        });
        let { email, phoneNumber, password } = this.state;
        if (!this.phone.isValidNumber()) {
            this.setState({
                phoneError: 'Please enter a valid phone number',
                loading: false
            });
            return;
        }

        if (!emailIsValid(email)) {
            this.setState({
                emailError: 'Please enter a valid email',
                loading: false
            });
            return;
        }
        let { status } = await UserService.checkIfEmailInUse(email);
        console.log(status);
        if (status == 'error') {
            this.setState({
                emailError: 'This email is already in use',
                loading: false
            });
            return;
        }
        this.props.screenProps.updateData(
            'account',
            {
                email,
                phoneNumber,
                password
            },
            () => {
                this.props.screenProps.submit();
            }
        );
    };

    onEnterEmail = email => {
        this.setState({
            email
        });
    };

    render() {
        let { email, phoneNumberFormatted, password, emailError } = this.state;
        return (
            <View style={{ flex: 1, marginTop: 30 }}>
                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        extraScrollHeight={50}
                        extraHeight={50}
                        keyboardShouldPersistTaps={'handled'}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                    >
                        <CloseButton
                            icon={'arrow-round-back'}
                            onPress={this._back}
                        />
                        <MinorText>Step 2 of 2</MinorText>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <HeadingText>Welcome to</HeadingText>
                            <Image
                                source={GATHR_LOGO}
                                style={{
                                    height: 60,
                                    width: 100,
                                    marginLeft: Spacing.smallest
                                }}
                                resizeMode={'contain'}
                            />
                        </View>
                        <PromptText style={{ marginBottom: 60 }}>
                            We use your account info to send you updates and
                            receipts.
                        </PromptText>

                        <TextField
                            containerStyle={styles.input}
                            titleTextStyle={{ fontFamily: 'Avenir' }}
                            labelTextStyle={{ fontFamily: 'Avenir' }}
                            tintColor="#4A4A4A"
                            label="Email"
                            value={email}
                            onChangeText={email => this.setState({ email })}
                            error={emailError}
                        />
                        <TextField
                            containerStyle={styles.input}
                            titleTextStyle={{ fontFamily: 'Avenir' }}
                            labelTextStyle={{ fontFamily: 'Avenir' }}
                            tintColor="#4A4A4A"
                            label="Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={password =>
                                this.setState({ password })
                            }
                        />
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
                    </KeyboardAwareScrollView>
                </View>
                <BarButton
                    title="Submit"
                    style={{
                        position: 'absolute',
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.green}
                    fill={Color.green}
                    onPress={this._goNext}
                    loading={this.state.loading || this.props.loading}
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

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    };
};

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default connect(
    mapStateToProps,
    null
)(AccountInformation);
