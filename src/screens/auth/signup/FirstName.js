import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import TextField from "Homecooked/src/components/TextFields/Material";
import Header from "Homecooked/src/components/Headers/Basic";
import { Spacing, Color } from "Homecooked/src/components/styles";

import { authTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

class FirstName extends Component {
    state = {
        firstName: ""
    };

    componentDidMount() {
        this.setState({
            firstName: this.props.screenProps.state.firstName
        });
    }

    // saga will transition to welcome if register is succesful
    _submit = () => {
        let { email, password } = this.props.screenProps.state;
        let { firstName } = this.state;

        this.props.screenProps.updateData("firstName", firstName);
        this.props.register(email, password, firstName);

        console.log(this.props);
    };

    _back = () => {
        this.props.navigation.goBack();
    };

    render() {
        let { firstName } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    title="Sign Up"
                    rightComponent={"next"}
                    rightOnPress={this._submit}
                    leftOnPress={this._back}
                />
                <View style={styles.container}>
                    <TextField
                        containerStyle={styles.input}
                        titleTextStyle={{ fontFamily: "Avenir" }}
                        labelTextStyle={{ fontFamily: "Avenir" }}
                        tintColor="#4A4A4A"
                        label="Your First Name"
                        value={firstName}
                        onChangeText={firstName => this.setState({ firstName })}
                    />
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    const register = (email, password, firstName) => {
        dispatch({
            type: authTypes.SIGNUP_REQUEST,
            payload: { email, password, firstName }
        });
    };
    return {
        register
    };
};

export default connect(
    null,
    mapDispatchToProps
)(FirstName);

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
