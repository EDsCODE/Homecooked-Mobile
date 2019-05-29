import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icon } from "react-native-elements";
import { Spacing, Color } from "Homecooked/src/components/styles";
import Header from "Homecooked/src/components/Headers/Basic";

import { authTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

import Button from "Homecooked/src/components/Buttons/BarButton";
import TextField from "Homecooked/src/components/TextFields/Material";

import NavigationService from "Homecooked/src/utils/NavigationService";

const coverImageUri = "Homecooked/src/assets/img/filledTable.jpg";

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    login = () => {
        let { email, password } = this.state;
        console.log("email:", email);
        console.log("Password:", password);
        this.props.login(email, password);
    };

    _back = () => {
        NavigationService.navigate("Landing");
    };

    render() {
        let { email, password } = this.state;
        return (
            <View>
                <Header title={"Login"} leftOnPress={this._back} />
                <Image style={styles.image} source={require(coverImageUri)} />
                <Text style={styles.caption}>Fayzeh's table, Nov. 2018</Text>
                <TextField
                    containerStyle={[styles.input]}
                    tintColor={Color.gray}
                    label="Email"
                    value={email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextField
                    containerStyle={styles.input}
                    tintColor={Color.gray}
                    label="Password"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={password => this.setState({ password })}
                />
                <Text style={styles.reset}>Forgot password?</Text>
                <Button
                    title="Continue with Facebook"
                    borderColor={Color.facebookBlue}
                    fill={Color.facebookBlue}
                    style={{
                        marginHorizontal: Spacing.large,
                        marginTop: Spacing.largest
                    }}
                />
                <Button
                    title="Login"
                    borderColor={Color.orange}
                    textColor={Color.orange}
                    style={{
                        marginHorizontal: Spacing.large,
                        marginTop: Spacing.small
                    }}
                    onPress={this.login}
                />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    const login = (email, password) => {
        dispatch({
            type: authTypes.LOGIN_REQUEST,
            payload: { email, password }
        });
    };
    return {
        login
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Login);

const HeaderTitle = props => (
    <Text style={{ fontFamily: "Avenir" }}>Log In</Text>
);

const styles = StyleSheet.create({
    image: {
        width: Spacing.deviceWidth,
        height: 250,
        backgroundColor: "white"
    },
    caption: {
        fontFamily: "Avenir",
        fontSize: 10,
        fontStyle: "italic",
        alignSelf: "flex-end",
        margin: 5
    },
    input: {
        marginHorizontal: Spacing.large
    },
    reset: {
        fontSize: 11,
        fontFamily: "Avenir",
        marginLeft: Spacing.large,
        color: Color.gray
    }
});
