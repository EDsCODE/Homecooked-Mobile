import React, { Component } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import Header from "Homecooked/src/components/Headers/Basic";
import Tabs from "Homecooked/src/components/Headers/Tabs";
import HistoryCell from "Homecooked/src/components/Cells/History";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

import { historyTypes, eventTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import {
    getUpcomingEvents,
    getPastEvents,
    orderEventsByDateEarliest,
    orderEventsByDateLatest
} from "Homecooked/src/modules/history/selectors";

import { EventViewTypes } from "Homecooked/src/types";

class HistoryMain extends Component {
    state = {
        tabSelected: 0
    };

    componentDidMount() {
        this.props.loadHistory();
    }

    _keyExtractor = (item, index) => item.id;

    onPress = () => {
        this.props.navigation.navigate("EventStack");
    };

    _renderUpcomingItem = ({ item, index }) => {
        let startTime = new Date(item.startTime);
        let endTime = new Date(startTime.getTime() + 60 * 60000);
        return (
            <HistoryCell
                tintColor={Color.green}
                upcoming={true}
                startTime={startTime}
                endTime={endTime}
                title={item.title}
                onPress={() => {
                    this.props.selectEvent(
                        item.id,
                        item.mode,
                        item.userBooking
                    );
                    this.props.navigation.navigate("HistoryMainEvent");
                }}
            />
        );
    };

    _renderPastItem = ({ item }) => {
        let startTime = new Date(item.startTime);
        let endTime = new Date(startTime.getTime() + 60 * 60000);
        return (
            <HistoryCell
                tintColor={Color.orange}
                upcoming={false}
                startTime={startTime}
                endTime={endTime}
                title={item.title}
                onPress={() => {
                    this.props.selectEvent(
                        item.id,
                        item.mode,
                        item.userBooking
                    );
                    this.props.navigation.navigate("HistoryMainEvent");
                }}
                showUtility={item.mode == EventViewTypes.HISTORY_REVIEW}
                utilityOnPress={() => {
                    {
                        this.props.navigation.navigate("ReviewEvent");
                        this.props.selectEvent(item.id, item.mode);
                    }
                }}
                utilityColor={Color.green}
                utilityTitle={"Review"}
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

    render() {
        return (
            <View>
                <Header title={"Your Tables"} leftComponent={() => null} />
                {this.props.initialLoad ? (
                    <ActivityIndicator />
                ) : (
                    <View>
                        <Tabs
                            tabSelected={index => this.changeTab(index)}
                            activeTab={this.state.tabSelected}
                            tabs={["Upcoming", "Past"]}
                        />
                        {this.state.tabSelected == 0 ? (
                            <FlatList
                                keyExtractor={this._keyExtractor}
                                style={{ height: "100%" }}
                                data={this.props.upcomingEvents}
                                extraData={this.props.upcomingEvents}
                                renderItem={this._renderUpcomingItem}
                                ItemSeparatorComponent={this._renderSeparator}
                            />
                        ) : (
                            <FlatList
                                keyExtractor={this._keyExtractor}
                                style={{ height: "100%" }}
                                data={this.props.pastEvents}
                                extraData={this.props.pastEvents}
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
    const { history, events, currentBookings } = state;
    return {
        initialLoad: history.initialLoad,
        upcomingEvents: orderEventsByDateEarliest(getUpcomingEvents(state)),
        pastEvents: orderEventsByDateLatest(getPastEvents(state))
    };
};

const mapDispatchToProps = dispatch => {
    const selectEvent = (eventId, mode, relatedBooking) => {
        dispatch({
            type: eventTypes.SELECT_EVENT,
            payload: {
                eventId,
                mode,
                parentRoute: "HistoryMain",
                relatedBooking
            }
        });
    };

    const loadHistory = () => {
        dispatch({
            type: historyTypes.LOAD_HISTORY_REQUEST
        });
    };
    return {
        loadHistory,
        selectEvent
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryMain);
