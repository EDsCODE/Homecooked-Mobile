import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    Linking
} from 'react-native';

import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';

import FloatyButton from 'Homecooked/src/components/Buttons/FloatyButton';
import { Color, Spacing } from 'Homecooked/src/components/styles';
import Button from 'Homecooked/src/components/Buttons/BarButton';

import { FacebookService } from 'Homecooked/src/services';

import { authTypes } from 'Homecooked/src/modules/types';
import { connect } from 'react-redux';

const firstPageImageURI = 'Homecooked/src/assets/img/Meet.jpg';
const secondPageImageURI = 'Homecooked/src/assets/img/Build.jpg';
const thirdPageImageURI = 'Homecooked/src/assets/img/Explore.jpg';

const { width, height } = Dimensions.get('window');

class Landing extends Component {
    openTerms = () => {
        Linking.openURL(
            'https://sites.google.com/homecooked.io/applink/terms-and-conditions'
        );
    };
    openPrivacy = () => {
        Linking.openURL(
            'https://sites.google.com/homecooked.io/applink/privacy-policy'
        );
    };
    openLiability = () => {
        Linking.openURL(
            'https://sites.google.com/homecooked.io/applink/liability-waiver'
        );
    };

    navigateToLogin = () => {
        this.props.navigation.navigate('Login');
    };

    navigateToSignUp = () => {
        this.props.navigation.navigate('SignUp');
    };

    _facebookOnPress = () => {
        onSuccess = result => {
            let image = {
                uri: result.picture.data.url,
                fileName: result.id + '_avatar',
                type: 'image/jpeg'
            };
            let { email, first_name: firstName, last_name: lastName } = result;
            this.props.facebookLogin(email, firstName, lastName, image);
        };

        onError = error => {
            this.setState({
                error: error
            });
        };

        new FacebookService(onSuccess, onError).login();
    };

    render() {
        return (
            <Swiper
                style={styles.wrapper}
                showsButtons={false}
                showsPagination={false}
                loop={false}
                ref={swiper => (this._swiper = swiper)}
            >
                <View style={styles.slide1}>
                    <ImageBackground
                        source={require(firstPageImageURI)}
                        style={{
                            width: Spacing.deviceWidth,
                            height: Spacing.deviceHeight
                        }}
                        resizeMode={'cover'}
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0)', '#000000']}
                            style={styles.linearGradient}
                        >
                            <Text style={styles.header}>Meet</Text>
                            <Text style={styles.tagline}>
                                new friends at the dining table
                            </Text>
                            <FloatyButton
                                onPress={() => this._swiper.scrollBy(1)}
                                style={{ marginTop: 10 }}
                                active={true}
                            />
                        </LinearGradient>
                    </ImageBackground>
                </View>
                <View style={styles.slide2}>
                    <ImageBackground
                        source={require(secondPageImageURI)}
                        style={{
                            width: Spacing.deviceWidth,
                            height: Spacing.deviceHeight
                        }}
                        resizeMode={'cover'}
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0)', '#000000']}
                            style={styles.linearGradient}
                        >
                            <Text style={[styles.header, { color: '#FDE74C' }]}>
                                Build
                            </Text>
                            <Text style={styles.tagline}>
                                community by hosting meals
                            </Text>
                            <FloatyButton
                                onPress={() => this._swiper.scrollBy(1)}
                                style={{ marginTop: 10 }}
                                active={true}
                            />
                        </LinearGradient>
                    </ImageBackground>
                </View>
                <View style={styles.slide3}>
                    <ImageBackground
                        source={require(thirdPageImageURI)}
                        style={{
                            width: Spacing.deviceWidth,
                            height: Spacing.deviceHeight
                        }}
                        resizeMode={'cover'}
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0)', '#000000']}
                            style={styles.linearGradient}
                        >
                            <Text style={[styles.header, { color: '#5BC0EB' }]}>
                                Explore
                            </Text>
                            <Text style={styles.tagline}>
                                your neighborhood through food
                            </Text>
                            <Button
                                title="Login with Facebook"
                                style={{ marginTop: 11 }}
                                borderColor={Color.facebookBlue}
                                fill={Color.facebookBlue}
                                onPress={this._facebookOnPress}
                            />
                            <Button
                                title="Sign Up"
                                style={{ marginTop: 11 }}
                                borderColor={Color.orange}
                                onPress={this.navigateToSignUp}
                            />
                            <Text
                                style={[
                                    styles.prompt,
                                    {
                                        marginTop: 6,
                                        marginLeft: 55,
                                        marginRight: 55,
                                        fontSize: 12,
                                        textAlign: 'center',
                                        color: 'white'
                                    }
                                ]}
                            >
                                {'By continuing you are accepting our '}
                                <Text
                                    style={{ textDecorationLine: 'underline' }}
                                    onPress={this.openTerms}
                                >
                                    terms of service
                                </Text>
                                {', '}
                                <Text
                                    style={{ textDecorationLine: 'underline' }}
                                    onPress={this.openPrivacy}
                                >
                                    privacy policy
                                </Text>
                                {', and '}
                                <Text
                                    style={{ textDecorationLine: 'underline' }}
                                    onPress={this.openLiability}
                                >
                                    liability agreement
                                </Text>
                                .
                            </Text>
                        </LinearGradient>
                        <LogInButton
                            style={{
                                position: 'absolute',
                                top: Spacing.extraLarge,
                                right: Spacing.large
                            }}
                            onPress={this.navigateToLogin}
                        />
                    </ImageBackground>
                </View>
            </Swiper>
        );
    }
}

const LogInButton = props => (
    <TouchableOpacity {...props}>
        <Text
            style={{
                color: Color.orange,
                fontSize: 14,
                fontWeight: 'bold',
                fontFamily: 'Avenir'
            }}
        >
            Log In
        </Text>
    </TouchableOpacity>
);

const mapDispatchToProps = dispatch => {
    const facebookLogin = (email, firstName, lastName, image) => {
        dispatch({
            type: authTypes.FACEBOOK_LOGIN_REQUEST,
            payload: { email, firstName, lastName, image }
        });
    };
    return {
        facebookLogin
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Landing);

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    linearGradient: {
        position: 'absolute',
        paddingBottom: 25,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: width,
        height: height / 1.5,
        bottom: 0
    },
    header: {
        fontFamily: 'Avenir',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#F8634C'
    },
    tagline: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: 'normal',
        letterSpacing: 1.03,
        color: 'white'
    },
    prompt: {
        fontFamily: 'Avenir',
        fontWeight: '400',
        fontSize: 16
    }
});
