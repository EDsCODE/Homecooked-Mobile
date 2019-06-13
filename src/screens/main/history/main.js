import React, { Component } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import Header from "Homecooked/src/components/Headers/Basic";
import Tabs from "Homecooked/src/components/Headers/Tabs";
import HistoryCell from "Homecooked/src/components/Cells/History";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

import { historyTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import {
    getUpcomingEvents,
    getPastEvents
} from "Homecooked/src/modules/history/selectors";

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
                upcoming={true}
                startTime={startTime}
                endTime={endTime}
                title={item.title}
                onPress={() =>
                    this.props.navigation.navigate("UpcomingEventStack", {
                        event: item
                    })
                }
            />
        );
    };

    _renderPastItem = ({ item }) => {
        let startTime = new Date(item.startTime);
        let endTime = new Date(startTime.getTime() + 60 * 60000);
        return (
            <HistoryCell
                upcoming={false}
                startTime={startTime}
                endTime={endTime}
                title={item.title}
                onPress={() =>
                    this.props.navigation.navigate("PastEventStack", {
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
        upcomingEvents: getUpcomingEvents(state),
        pastEvents: getPastEvents(state)
    };
};

const mapDispatchToProps = dispatch => {
    const loadHistory = () => {
        dispatch({
            type: historyTypes.LOAD_HISTORY_REQUEST
        });
    };
    return {
        loadHistory
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryMain);
