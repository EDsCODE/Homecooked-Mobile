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

import { EventViewTypes } from "Homecooked/src/types";
import { eventTypes } from "Homecooked/src/modules/types";
import NavigationService from "Homecooked/src/utils/NavigationService";

import EmptyComponent from "Homecooked/src/components/List/EmptyComponent";

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

    _onRefresh = () => {
        this.props.loadHostingEvents();
    };

    _keyExtractor = (item, index) => item.id;

    _renderUpcomingItem = ({ item, index }) => {
        let startTime = new Date();
        let endTime = new Date(startTime.getTime() + 60 * 60000);
        return (
            <HistoryCell
                tintColor={Color.green}
                startTime={startTime}
                endTime={endTime}
                title={item.title}
                onPress={() => {
                    NavigationService.navigate("HostTablesMainEvent");
                    this.props.selectEvent(item.id, item.mode);
                }}
                showUtility={item.mode == EventViewTypes.HOST_CLOSEABLE}
                utilityOnPress={() => {
                    {
                        this.props.navigation.navigate("CloseEventStack");
                        this.props.selectEvent(item.id, item.mode);
                    }
                }}
                utilityColor={Color.orange}
                utilityTitle={"Close Event"}
            />
        );
    };

    _renderPastItem = ({ item }) => {
        let startTime = new Date();
        let endTime = new Date(startTime.getTime() + 60 * 60000);
        return (
            <HistoryCell
                tintColor={Color.orange}
                startTime={startTime}
                endTime={endTime}
                title={item.title}
                onPress={() => {
                    console.log(item);
                    NavigationService.navigate("HostTablesMainEvent");
                    this.props.selectEvent(item.id, item.mode);
                }}
            />
        );
    };

    _renderInReviewItem = ({ item }) => {
        let startTime = new Date();
        let endTime = new Date(startTime.getTime() + 60 * 60000);
        return (
            <HistoryCell
                tintColor={Color.yellow}
                startTime={startTime}
                endTime={endTime}
                title={item.title}
                onPress={() => {
                    NavigationService.navigate("HostTablesMainEvent");

                    this.props.selectEvent(item.id, item.mode);
                }}
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
        this.props.navigation.navigate("CreateEventStack");
        return;
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

    displayList = tabSelected => {
        if (tabSelected == 0) {
            return (
                <FlatList
                    keyExtractor={this._keyExtractor}
                    style={{ height: "100%" }}
                    data={this.props.activeEvents}
                    extraData={this.props.activeEvents}
                    renderItem={this._renderUpcomingItem}
                    refreshing={this.props.loading}
                    onRefresh={this._onRefresh}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListEmptyComponent={() => (
                        <EmptyComponent>{"No Events"}</EmptyComponent>
                    )}
                />
            );
        } else if (tabSelected == 1) {
            return (
                <FlatList
                    keyExtractor={this._keyExtractor}
                    style={{ height: "100%" }}
                    data={this.props.inReviewEvents}
                    extraData={this.props.inReviewEvents}
                    renderItem={this._renderInReviewItem}
                    onRefresh={this._onRefresh}
                    ItemSeparatorComponent={this._renderSeparator}
                    refreshing={this.props.loading}
                    ListEmptyComponent={() => (
                        <EmptyComponent>{"No Events"}</EmptyComponent>
                    )}
                />
            );
        } else {
            return (
                <FlatList
                    keyExtractor={this._keyExtractor}
                    style={{ height: "100%" }}
                    data={this.props.inactiveEvents}
                    extraData={this.props.inactiveEvents}
                    renderItem={this._renderPastItem}
                    refreshing={this.props.loading}
                    onRefresh={this._onRefresh}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListEmptyComponent={() => (
                        <EmptyComponent>{"No Events"}</EmptyComponent>
                    )}
                />
            );
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    title={"Your Tables"}
                    leftComponent={() => null}
                    rightComponent={"new"}
                    rightOnPress={this._navigateToCreateEvent}
                />
                <View style={{ flex: 1 }}>
                    <Tabs
                        tabSelected={index => this.changeTab(index)}
                        activeTab={this.state.tabSelected}
                        tabs={["Upcoming", "In Review", "Past"]}
                    />
                    {this.props.initialLoad ? (
                        <ActivityIndicator />
                    ) : (
                        this.displayList(this.state.tabSelected)
                    )}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { host, currentUser } = state;
    return {
        currentUser,
        host: host,
        loading: host.eventsLoading,
        initialLoad: host.initialLoad,
        activeEvents: hostSelectors.getActiveEvents(state),
        inactiveEvents: hostSelectors.getInactiveEvents(state),
        inReviewEvents: hostSelectors.getInReviewEvents(state)
    };
};

const mapDispatchToProps = dispatch => {
    const selectEvent = (eventId, mode) => {
        dispatch({
            type: eventTypes.SELECT_EVENT,
            payload: {
                eventId,
                mode,
                parentRoute: "HostTablesMain"
            }
        });
    };

    const loadHostingEvents = () => {
        dispatch({
            type: hostTypes.LOAD_HOSTING_EVENTS_REQUEST
        });
    };
    return {
        loadHostingEvents,
        selectEvent
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HostTablesMain);
