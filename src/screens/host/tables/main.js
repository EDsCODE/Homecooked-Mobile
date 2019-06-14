import React, { Component } from "react";
import {
    View,
    FlatList,
    Text,
    ActivityIndicator,
    Alert,
    Linking
} from "react-native";
import Header from "Homecooked/src/components/Headers/Basic";
import Tabs from "Homecooked/src/components/Headers/Tabs";
import HistoryCell from "Homecooked/src/components/Cells/History";
import { STRIPE_HOST_ACCOUNT_URL } from "Homecooked/src/config/constants";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

import { connect } from "react-redux";
import { hostTypes } from "Homecooked/src/modules/types";
import * as hostSelectors from "Homecooked/src/modules/host/selectors";

class HostTablesMain extends Component {
    state = {
        tabSelected: 0
    };

    componentDidMount() {
        this.setState({
            stripeurl: STRIPE_HOST_ACCOUNT_URL(
                this.props.host.id,
                this.props.currentUser.email,
                this.props.currentUser.firstName
            )
        });
        this.props.loadHostingEvents();
    }

    _keyExtractor = (item, index) => item.id;

    _renderUpcomingItem = ({ item, index }) => {
        let startTime = new Date();
        let endTime = new Date(startTime.getTime() + 60 * 60000);
        return (
            <HistoryCell
                upcoming={true}
                startTime={startTime}
                endTime={endTime}
                title={item.title}
                onPress={() =>
                    this.props.navigation.navigate("HostUpcomingEventStack", {
                        event: item
                    })
                }
            />
        );
    };

    _renderPastItem = ({ item }) => {
        let startTime = new Date();
        let endTime = new Date(startTime.getTime() + 60 * 60000);
        return (
            <HistoryCell
                upcoming={false}
                startTime={startTime}
                endTime={endTime}
                title={item.title}
                onPress={() =>
                    this.props.navigation.navigate("HostPastEventStack", {
                        event: item
                    })
                }
            />
        );
    };

    changeTab = index => {
        this.setState({
            tabSelected: index
        });
    };

    _renderSeparator = () => (
        <View
            style={{
                borderBottomColor: Color.black,
                borderBottomWidth: 1,
                width: "90%",
                alignSelf: "center"
            }}
        />
    );

    _navigateToCreateEvent = () => {
        if (this.props.host.stripeAccountId) {
            this.props.navigation.navigate("CreateEventStack");
        } else {
            Alert.alert(
                "Payment Account",
                "Please add a payment account before you start hosting events.",
                [
                    {
                        text: "Continue",
                        onPress: () => Linking.openURL(this.state.stripeurl)
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    }
                ]
            );
        }
    };

    render() {
        return (
            <View>
                <Header
                    title={"Your Tables"}
                    leftComponent={() => null}
                    rightComponent={"new"}
                    rightOnPress={this._navigateToCreateEvent}
                />
                {this.props.initialLoad ? (
                    <ActivityIndicator />
                ) : (
                    <View>
                        <Tabs
                            tabSelected={index => this.changeTab(index)}
                            activeTab={this.state.tabSelected}
                        />
                        {this.state.tabSelected == 0 ? (
                            <FlatList
                                keyExtractor={this._keyExtractor}
                                style={{ height: "100%" }}
                                data={this.props.activeEvents}
                                extraData={this.props.activeEvents}
                                renderItem={this._renderUpcomingItem}
                                ItemSeparatorComponent={this._renderSeparator}
                            />
                        ) : (
                            <FlatList
                                keyExtractor={this._keyExtractor}
                                style={{ height: "100%" }}
                                data={this.props.inactiveEvents}
                                extraData={this.props.inactiveEvents}
                                renderItem={this._renderPastItem}
                                ItemSeparatorComponent={this._renderSeparator}
                            />
                        )}
                    </View>
                )}
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { host, currentUser } = state;
    return {
        currentUser,
        host: host,
        initialLoad: host.initialLoad,
        activeEvents: hostSelectors.getActiveEvents(state),
        inactiveEvents: hostSelectors.getInactiveEvents(state)
    };
};

const mapDispatchToProps = dispatch => {
    const loadHostingEvents = () => {
        dispatch({
            type: hostTypes.LOAD_HOSTING_EVENTS_REQUEST
        });
    };
    return {
        loadHostingEvents
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HostTablesMain);
