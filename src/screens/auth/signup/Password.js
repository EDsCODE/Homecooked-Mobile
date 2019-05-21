import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import TextField from "Homecooked/src/components/TextFields/Material";
import Header from "Homecooked/src/components/Headers/Basic";
import { Spacing, Color } from "Homecooked/src/components/styles";

export default class Password extends Component {
    state = {
        password: ""
    };

    componentDidMount() {
        this.setState({
            password: this.props.screenProps.state.password
        });
    }

    _navigateNext = () => {
        this.props.screenProps.updateData("password", this.state.password);
        this.props.navigation.navigate("FirstName");
    };

    _back = () => {
        this.props.navigation.goBack();
    };

    render() {
        let { password } = this.state;
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
                        label="Your Password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })}
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
