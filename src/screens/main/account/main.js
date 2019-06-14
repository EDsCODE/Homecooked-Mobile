import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import HeaderCell from "Homecooked/src/components/Cells/AccountHeaderCell";
import Cell from "Homecooked/src/components/Cells/AccountCell";
import NavigationService from "Homecooked/src/utils/NavigationService";

import { hostTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import branch, { BranchEvent } from 'react-native-branch';
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

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
                title: "Payment"
            },
            {
                title: "Refer Friends",
                onPress: () => this.getReferralLink()
            },
            {
                title: "Refer a host",
                prompt: "Earn $8 for each new host you refer"
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

    getReferralLink = async () => {
        //branch.setIdentity('theUserId') // <- Identifiy the user in branch
        let branchUniversalObject = await branch.createBranchUniversalObject('canonicalIdentifier', {
            automaticallyListOnSpotlight: true,
            metadata: { prop1: 'test', prop2: 'abc' },
            title: "You're Invited!",
            contentDescription: 'Tarun has invited you to join Gathr!'
        })
        let linkProperties = {
            feature: 'referral',
            channel: 'SMS'
        }
        let controlParams = {
            $desktop_url: 'http://gathrtable.com'
        }

        var firstName = this.props.currentUser.firstName;
        let shareOptions = { messageHeader: "You're Invited!", messageBody: '' + firstName +' has invited you to Gathr. Come join the table!' }
        let { channel, completed, error } = await
            branchUniversalObject.showShareSheet(shareOptions, linkProperties, controlParams);
        
        console.log(channel)
        console.log(completed)
        console.log(error)
        return { channel, completed, error }
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
