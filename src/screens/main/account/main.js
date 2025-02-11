import React, { Component } from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Linking,
    ActivityIndicator
} from "react-native";

import HeaderCell from "Homecooked/src/components/Cells/AccountHeaderCell";
import Cell from "Homecooked/src/components/Cells/AccountCell";
import NavigationService from "Homecooked/src/utils/NavigationService";

import { hostTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import branch, { BranchEvent } from "react-native-branch";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    hostRow = status => {
        var title, onPress, icon;
        if (status) {
            if (status == "REQ") {
                title = "App in review (talk soon!)";
                icon = require("Homecooked/src/assets/img/Hospitality.png");
            } else if (status == "CNF") {
                title = "Switch to Host Mode";
                onPress = () => NavigationService.navigate("Host");
                icon = require("Homecooked/src/assets/img/sort.png");
            } else {
                title = "Become a host";
                onPress = () => this._goToCreateApplication();
                icon = require("Homecooked/src/assets/img/Hospitality.png");
            }
        } else {
            title = "Become a host";
            onPress = () => this._goToCreateApplication();
            icon = require("Homecooked/src/assets/img/Hospitality.png");
        }

        return {
            title,
            onPress,
            icon
        };
    };

    componentDidMount() {
        this.props.loadChef();
        let settingRows = [
            {},
            this.hostRow(this.props.hostStatus),
            {
                title: "Payment",
                onPress: () => this._goToPayment(),
                icon: require("Homecooked/src/assets/img/purse.png")
            },
            {
                title: "Invite Friends",
                onPress: () => this.getReferralLink(),
                icon: require("Homecooked/src/assets/img/giftbox.png")
            },
            {
                title: "FAQ",
                onPress: () => this._goToFAQ(),
                icon: require("Homecooked/src/assets/img/question.png")
            },
            {
                title: "Settings",
                onPress: () => this._goToSettings(),
                icon: require("Homecooked/src/assets/img/gears.png")
            }
        ];
        this.setState({
            data: settingRows
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.hostStatus != nextProps.hostStatus) {
            let newRows = this.state.data;
            newRows[1] = this.hostRow(nextProps.hostStatus);
            this.setState({
                data: newRows
            });
        }
    }

    _goToCreateApplication = () => {
        this.props.navigation.navigate("HostApplication");
    };

    _goToSettings = () => {
        this.props.navigation.navigate("Settings");
    };

    _goToProfile = () => {
        this.props.navigation.navigate("Profile");
    };

    _goToPayment = () => {
        this.props.navigation.navigate("Payment");
    };

    _goToFAQ = () => {
        Linking.openURL("https://www.gathrtable.com/faq");
    };

    _renderProfileImage = () => {
        if (this.props.currentUser.profileImageSignedUrl) {
            return this.props.currentUser.profileImageSignedUrl;
        } else {
            return null;
        }
    };

    getReferralLink = async () => {
        //branch.setIdentity('theUserId') // <- Identifiy the user in branch
        let branchUniversalObject = await branch.createBranchUniversalObject(
            "canonicalIdentifier",
            {
                automaticallyListOnSpotlight: true,
                metadata: { prop1: "test", prop2: "abc" },
                title: "You're Invited!",
                contentDescription:
                    "" + firstName + " has invited you to join Gathr!"
            }
        );
        let linkProperties = {
            feature: "referral",
            channel: "SMS"
        };
        let controlParams = {
            $desktop_url: "http://gathrtable.com"
        };

        var firstName = this.props.currentUser.firstName;
        let shareOptions = {
            messageHeader: "You're Invited!",
            messageBody:
                "" +
                firstName +
                " has invited you to Gathr. Come join the table!"
        };
        let {
            channel,
            completed,
            error
        } = await branchUniversalObject.showShareSheet(
            shareOptions,
            linkProperties,
            controlParams
        );

        return { channel, completed, error };
    };

    _renderItem = ({ item, index }) => {
        let {
            currentUser: { firstName }
        } = this.props;

        if (index == 0) {
            // render header cell
            return (
                <HeaderCell
                    key={index.toString()}
                    onPress={this._goToProfile}
                    id={item.id}
                    name={firstName}
                    source={this._renderProfileImage()}
                    loading={this.props.currentUser.loadingAvatar}
                />
            );
        } else if (index == 1 && this.props.loading) {
            return (
                <View style={{ marginVertical: Spacing.base }}>
                    <ActivityIndicator />
                </View>
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

    _keyExtractor = (item, index) => index.toString();

    _renderSeparator = () => (
        <View
            style={{
                borderBottomColor: Color.lightestGray,
                borderBottomWidth: 1
            }}
        />
    );

    _refresh = () => {
        this.props.loadChef();
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    extraData={this.props}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                    keyExtractor={this._keyExtractor}
                    refreshing={this.props.loading}
                    onRefresh={this._refresh}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        hostStatus: state.host.status,
        loading: state.host.loading,
        currentUser: state.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    const loadChef = () => {
        dispatch({
            type: hostTypes.GET_CHEF_REQUEST
        });
    };

    return {
        loadChef
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Spacing.larger,
        marginHorizontal: 22
    }
});
