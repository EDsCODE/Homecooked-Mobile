import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import Header from "Homecooked/src/components/Headers/Basic";
import Tabs from "Homecooked/src/components/Headers/Tabs";
import HistoryCell from "Homecooked/src/components/Cells/History";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const upcoming = [
    {
        title: "Simple Classics",
        date: Date(),
        price: 16,
        distance: 0.9
    },
    {
        title: "Simple Classics",
        date: Date(),
        price: 16,
        distance: 0.9
    }
];

const past = [
    {
        title: "Simple Classics",
        date: Date(),
        price: 16,
        distance: 0.9
    },
    {
        title: "Simple Classics",
        date: Date(),
        price: 16,
        distance: 0.9
    },
    {
        title: "Simple Classics",
        date: Date(),
        price: 16,
        distance: 0.9
    }
];

export default class HistoryMain extends Component {
    state = {
        tabSelected: 0
    };

    componentDidMount() {
        this.setState({
            upcoming: upcoming,
            past: past
        });
    }

    _keyExtractor = (item, index) => item.id;

    onPress = () => {
        this.props.navigation.navigate("EventStack");
    };

    _renderUpcomingItem = ({ item, index }) => {
        let startTime = new Date();
        let endTime = new Date(startTime.getTime() + 60 * 60000);
        return (
            <HistoryCell
                upcoming={true}
                startTime={startTime}
                endTime={endTime}
                title={"A Texan Treat"}
                onPress={() =>
                    this.props.navigation.navigate("UpcomingEventStack")
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
                title={"A Texan Treat"}
                onPress={() => this.props.navigation.navigate("PastEventStack")}
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
                <Tabs
                    tabSelected={index => this.changeTab(index)}
                    activeTab={this.state.tabSelected}
                />
                {this.state.tabSelected == 0 ? (
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        style={{ height: "100%" }}
                        data={this.state.upcoming}
                        renderItem={this._renderUpcomingItem}
                        ItemSeparatorComponent={this._renderSeparator}
                    />
                ) : (
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        style={{ height: "100%" }}
                        data={this.state.past}
                        renderItem={this._renderPastItem}
                        ItemSeparatorComponent={this._renderSeparator}
                    />
                )}
            </View>
        );
    }
}
