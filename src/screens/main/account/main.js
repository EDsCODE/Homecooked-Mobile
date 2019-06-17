import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import HeaderCell from "Homecooked/src/components/Cells/AccountHeaderCell";
import Cell from "Homecooked/src/components/Cells/AccountCell";
import NavigationService from "Homecooked/src/utils/NavigationService";

import { hostTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const PROFILE_PLACEHOLDER_IMAGE = "Homecooked/src/assets/img/filledTable.jpg";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    hostRow = status => {
        if (status) {
            if (status == "REQ") {
                return {
                    title: "Host application under review"
                };
            } else if (status == "CNF") {
                return {
                    title: "Switch to Host Mode",
                    onPress: () => NavigationService.navigate("Host")
                };
            } else {
                return {
                    title: "Submit application to become a host",
                    onPress: () => this._goToCreateApplication()
                };
            }
        } else {
            return {
                title: "Submit application to become a host",
                onPress: () => this._goToCreateApplication()
            };
        }
    };

    componentDidMount() {
        this.props.getChef();
        let settingRows = [
            {},
            this.hostRow(this.props.hostStatus),
            {
                title: "Payment",
                onPress: () => this._goToPayment()
            },
            {
                title: "Invite Friends"
            },
            {
                title: "FAQ"
            },
            {
                title: "Settings",
                onPress: () => this._goToSettings()
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

    _renderProfileImage = () => {
        if (this.props.currentUser.profileImageSignedUrl) {
            return {
                uri: this.props.currentUser.profileImageSignedUrl
            };
        } else {
            return require(PROFILE_PLACEHOLDER_IMAGE);
        }
    };

    _renderItem = ({ item, index }) => {
        let {
            currentUser: { firstName }
        } = this.props;

        if (index == 0) {
            // render header cell
            return (
                <HeaderCell
                    onPress={this._goToProfile}
                    id={item.id}
                    name={firstName}
                    source={this._renderProfileImage()}
                    loading={this.props.currentUser.loadingAvatar}
                />
            );
        } else {
            return (
                <Cell
                    id={item.id}
                    title={item.title}
                    prompt={item.prompt}
                    onPress={item.onPress}
                />
            );
        }
    };

    _keyExtractor = (item, index) => item.id;

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

const mapStateToProps = state => {
    return {
        hostStatus: state.host.status,
        currentUser: state.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    const getChef = () => {
        dispatch({
            type: hostTypes.GET_CHEF_REQUEST,
            payload: {
                userId: "7aff6007-d658-4944-bd41-ea2d05589864"
            }
        });
    };

    return {
        getChef
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
