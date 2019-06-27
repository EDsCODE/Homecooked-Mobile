import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet, Linking } from "react-native";

import HeaderCell from "Homecooked/src/components/Cells/AccountHeaderCell";
import Cell from "Homecooked/src/components/Cells/AccountCell";
import NavigationService from "Homecooked/src/utils/NavigationService";
import { STRIPE_HOST_ACCOUNT_URL } from "Homecooked/src/config/constants";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

import { connect } from "react-redux";
import { hostTypes } from "Homecooked/src/modules/types";
import { getHostImage } from "Homecooked/src/modules/host/selectors";

const PROMPT = "Edit Host Profile";

const PROFILE_PLACEHOLDER_IMAGE = "Homecooked/src/assets/img/filledTable.jpg";

class Host_Settings_Main extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const STRIPE_URL = STRIPE_HOST_ACCOUNT_URL(
            this.props.host.id,
            this.props.currentUser.email,
            this.props.currentUser.firstName
        );
        const SETTING_ROWS = [
            {},
            {
                title: "Switch to Guest Mode",
                onPress: () => NavigationService.navigate("Main"),
                icon: require("Homecooked/src/assets/img/Switch.png")
            },
            {
                title: "Payment Settings",
                onPress: () => Linking.openURL(STRIPE_URL),
                icon: require("Homecooked/src/assets/img/Payouts.png")
            },
            {
                title: "FAQ",
                onPress: () => this._goToFAQ(),
                icon: require("Homecooked/src/assets/img/FAQ.png")
            },
            {
                title: "Settings",
                onPress: () => this._goToSettings(),
                icon: require("Homecooked/src/assets/img/Settings.png")
            }
        ];
        this.setState({
            data: SETTING_ROWS
        });
    }

    _goToFAQ = () => {
        Linking.openURL("https://www.gathrtable.com/faq");
    };

    _goToSettings = () => {
        this.props.navigation.navigate("Settings");
    };

    _renderProfileImage = () => {
        if (this.props.host.profileImageSignedUrl) {
            return {
                uri: this.props.host.profileImageSignedUrl
            };
        } else {
            return require(PROFILE_PLACEHOLDER_IMAGE);
        }
    };

    _renderItem = ({ item, index }) => {
        let {
            currentUser: { firstName },
            hostImage
        } = this.props;
        if (index == 0) {
            // render header cell
            return (
                <HeaderCell
                    key={index.toString()}
                    id={item.id}
                    name={firstName}
                    prompt={PROMPT}
                    source={this._renderProfileImage()}
                    onPress={this._goToProfile}
                />
            );
        } else {
            return (
                <Cell
                    key={index.toString()}
                    id={item.id}
                    title={item.title}
                    prompt={item.prompt}
                    onPress={item.onPress}
                    icon={item.icon}
                />
            );
        }
    };

    _goToProfile = () => {
        this.props.navigation.navigate("Profile");
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

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                    bounces={false}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { host, currentUser } = state;
    return {
        host,
        currentUser,
        hostImage: host.profileImageSignedUrl
    };
};

export default connect(
    mapStateToProps,
    null
)(Host_Settings_Main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Spacing.larger,
        marginHorizontal: 22
    }
});
