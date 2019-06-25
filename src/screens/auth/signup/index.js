import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Personal from "./Personal";
import Account from "./Account";
import FirstName from "./FirstName";

import { authTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

const SignUpStack = createStackNavigator(
    {
        PersonalInformation: {
            screen: Personal
        },
        AccountInformation: {
            screen: Account
        },
        FirstName: {
            screen: FirstName
        }
    },
    {
        initialRouteName: "PersonalInformation",
        headerMode: "none"
    }
);

class SignUp extends Component {
    static router = SignUpStack.router;

    state = {
        personal: {
            firstName: "",
            lastName: "",
            dob: ""
        },
        account: {
            email: "",
            password: "",
            phoneNumber: ""
        }
    };

    updateData = (key, value, cb) => {
        this.setState(
            {
                [key]: value
            },
            () => {
                typeof cb === "function" && cb();
            }
        );
    };

    submit = () => {
        let { personal, account } = this.state;
        this.props.register(personal, account);
        console.log(this.state);
    };

    render() {
        const { navigation } = this.props;

        return (
            <SignUpStack
                navigation={navigation}
                screenProps={{
                    updateData: this.updateData,
                    state: this.state,
                    submit: this.submit
                }}
            />
        );
    }
}

const mapDispatchToProps = dispatch => {
    const register = (personal, account) => {
        dispatch({
            type: authTypes.SIGNUP_REQUEST,
            payload: { personal, account }
        });
    };
    return {
        register
    };
};

export default connect(
    null,
    mapDispatchToProps
)(SignUp);
