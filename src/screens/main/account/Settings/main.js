import React, { Component } from "react";
import { View, StyleSheet, FlatList, Button, Linking } from "react-native";

import Header from "Homecooked/src/components/Headers/Basic";
import NavigationService from "Homecooked/src/utils/NavigationService";
import Cell from "Homecooked/src/components/Cells/AccountCell";

import { authTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

class SettingsMain extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    _goBack = () => {
        NavigationService.navigate("AccountMain");
    };

    componentDidMount() {
        let settingRows = [
            {
                title: "Terms and Conditions",
                onPress: () =>
                    Linking.openURL(
                        "https://sites.google.com/homecooked.io/applink/terms-and-conditions?authuser=0"
                    )
            },
            {
                title: "Privacy Policy",
                onPress: () =>
                    Linking.openURL(
                        "https://sites.google.com/homecooked.io/applink/privacy-policy?authuser=0"
                    )
            },
            {
                title: "Liability",
                onPress: () =>
                    Linking.openURL(
                        "https://sites.google.com/homecooked.io/applink/liability-waiver?authuser=0"
                    )
            },
            {
                title: "Sign Out",
                onPress: () => this._signOut()
            }
        ];
        this.setState({
            data: settingRows
        });
    }

    _signOut = () => {
        this.props.signout();
        NavigationService.navigate("Auth");
    };

    _keyExtractor = (item, index) => index.toString();

    _renderSeparator = () => (
        <View
            style={{
                borderBottomColor: Color.lightestGray,
                borderBottomWidth: 1
            }}
        />
    );

    _renderItem = ({ item, index }) => {
        return (
            <Cell
                key={index.toString()}
                id={item.id}
                title={item.title}
                prompt={item.prompt}
                onPress={item.onPress}
            />
        );
    };

    render() {
        return (
            <View>
                <Header title={"Settings"} leftOnPress={this._goBack} />
                <FlatList
                    data={this.state.data}
                    extraData={this.props}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                    bounces={false}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    const signout = () => {
        dispatch({
            type: authTypes.SIGNOUT_REQUEST
        });
    };
    return {
        signout
    };
};

export default connect(
    null,
    mapDispatchToProps
)(SettingsMain);
