import React, { Component } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import Header from "Homecooked/src/components/Headers/Basic";
import EventCell from "Homecooked/src/components/Cells/Event";
import Tabs from "Homecooked/src/components/Headers/Tabs";
import { feedTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import {
    getActiveEvents,
    getEventsForCity
} from "Homecooked/src/modules/feed/selectors";

import { CityFilter } from "Homecooked/src/types";

class Feed extends Component {
    state = {
        data: [],
        tabSelected: 0
    };

    componentDidMount() {
        console.log(this.props);
        this.props.loadFeed();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    _keyExtractor = (item, index) => item.id;

    onPress = event => {
        this.props.navigation.navigate("EventStack", { event });
    };

    _renderItem = ({ item }) => {
        return <EventCell key={item.id} event={item} onPress={this.onPress} />;
    };

    changeTab = index => {
        this.props.selectCity(index);
        this.setState({
            tabSelected: index
        });
    };

    displayList = () => {
        if (this.props.initialLoad) {
            return <ActivityIndicator />;
        } else {
            return (
                <FlatList
                    keyExtractor={this._keyExtractor}
                    style={{ height: "100%" }}
                    data={this.props.events}
                    extraData={this.props.events}
                    renderItem={this._renderItem}
                />
            );
        }
    };

    render() {
        let FILTERS = Object.values(CityFilter);

        return (
            <View>
                <Header title={"Open Tables"} leftComponent={() => null} />
                <Tabs
                    tabSelected={index => this.changeTab(index)}
                    activeTab={this.state.tabSelected}
                    tabs={FILTERS}
                />
                {this.displayList()}
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { feed, events, currentBookings } = state;
    return {
        initialLoad: feed.initialLoad,
        events: getEventsForCity(state)
    };
};

const mapDispatchToProps = dispatch => {
    const loadFeed = () => {
        dispatch({
            type: feedTypes.LOAD_FEED_REQUEST
        });
    };

    const selectCity = city => {
        dispatch({
            type: feedTypes.CITY_FILTER_SELECTED,
            payload: {
                city
            }
        });
    };
    return {
        loadFeed,
        selectCity
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);
