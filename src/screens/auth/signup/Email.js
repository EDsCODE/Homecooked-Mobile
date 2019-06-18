import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import TextField from "Homecooked/src/components/TextFields/Material";
import Header from "Homecooked/src/components/Headers/Basic";
import { Spacing, Color } from "Homecooked/src/components/styles";

import NavigationService from "Homecooked/src/utils/NavigationService";

export default class Email extends Component {
    state = {
        email: ""
    };

    componentDidMount() {
        this.setState({
            email: this.props.screenProps.state.email
        });
    }

    _navigateNext = () => {
        this.props.screenProps.updateData("email", this.state.email);
        this.props.navigation.navigate("Password");
    };

    _back = () => {
        NavigationService.navigate("Landing");
    };

    render() {
        let { email } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    title="Sign Up"
                    rightComponent={"next"}
                    rightOnPress={this._navigateNext}
                    leftOnPress={this._back}
                />
                <View style={styles.container}>
                    <TextField
                        containerStyle={styles.input}
                        titleTextStyle={{ fontFamily: "Avenir" }}
                        labelTextStyle={{ fontFamily: "Avenir" }}
                        tintColor="#4A4A4A"
                        label="Your Email Address"
                        value={email}
                        onChangeText={email => this.setState({ email })}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.white,
        flex: 1,
        justifyContent: "center"
    },
    input: {
        marginHorizontal: Spacing.large
    }
});
