import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet, Linking } from "react-native";

import HeaderCell from "Homecooked/src/components/Cells/AccountHeaderCell";
import Cell from "Homecooked/src/components/Cells/AccountCell";
import NavigationService from "Homecooked/src/utils/NavigationService";
import { STRIPE_HOST_ACCOUNT_URL } from "Homecooked/src/config/constants";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

import { connect } from "react-redux";
import { hostTypes } from "Homecooked/src/modules/types";

const PROMPT = "Edit Host Profile";

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
                onPress: () => NavigationService.navigate("Main")
            },
            {
                title: "Payment Settings",
                onPress: () => Linking.openURL(STRIPE_URL)
            },
            {
                title: "Invite Friends",
                prompt: "Earn $3 for each friend who attends a meal"
            },
            {
                title: "Refer a host",
                prompt: "Earn $8 for each new host you refer"
            },
            {
                title: "FAQ"
            },
            {
                title: "Settings"
            }
        ];
        this.setState({
            data: SETTING_ROWS
        });
    }

    _renderItem = ({ item, index }) => {
        console.log(index);
        if (index == 0) {
            // render header cell
            return <HeaderCell id={item.id} name="Eric" prompt={PROMPT} />;
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
        currentUser
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
