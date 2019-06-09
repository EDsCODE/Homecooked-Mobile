import React, { Component } from "react";
import { View } from "react-native";
import SInfo from "react-native-sensitive-info";

import { authTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

class Loading extends Component {
    async componentDidMount() {
        await this.refresh();
    }

    refresh = async () => {
        try {
            let refreshToken = await SInfo.getItem("refreshToken", {});
            let email = await SInfo.getItem("email", {});
            if (email && refreshToken) {
                this.props.refreshToken(email, refreshToken);
            } else {
                this.props.navigation.navigate("Auth");
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return <View />;
    }
}

const mapDispatchToProps = dispatch => {
    const refreshToken = (email, refreshToken) => {
        dispatch({
            type: authTypes.REFRESH_TOKEN_REQUEST,
            payload: {
                email,
                refreshToken
            }
        });
    };

    return {
        refreshToken
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Loading);
