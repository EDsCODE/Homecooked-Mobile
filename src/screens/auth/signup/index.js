import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Email from "./Email";
import Password from "./Password";
import FirstName from "./FirstName";

const state = {
    email: "",
    password: "",
    firstName: ""
};

const SignUpStack = createStackNavigator(
    {
        Email: {
            screen: Email
        },
        Password: {
            screen: Password
        },
        FirstName: {
            screen: FirstName
        }
    },
    {
        initialRouteName: "Email",
        headerMode: "none"
    }
);

class SignUp extends Component {
    static router = SignUpStack.router;

    componentDidMount() {}

    state = {
        email: "",
        password: "",
        firstName: ""
    };

    updateData = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const { navigation } = this.props;

        return (
            <SignUpStack
                navigation={navigation}
                screenProps={{ updateData: this.updateData, state: this.state }}
            />
        );
    }
}

export default SignUp;
