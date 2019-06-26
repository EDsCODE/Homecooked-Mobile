import React, { Component } from "react";
import { View } from "react-native";
import Header from "Homecooked/src/components/Headers/Basic";
import Tabs from "Homecooked/src/components/Headers/Tabs";
import { feedTypes, eventTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import {
    getActiveEvents,
    getEventsForCity
} from "Homecooked/src/modules/feed/selectors";

import EventList from "Homecooked/src/components/List/EventList";

import { CityFilter, EventViewTypes } from "Homecooked/src/types";

class Feed extends Component {
    state = {
        data: [],
        tabSelected: 0
    };

    componentDidMount() {
        this.props.loadFeed();
    }

    _keyExtractor = (item, index) => item.id;

    onPress = event => {
        this.props.selectEvent(event.id, event.mode);
        this.props.navigation.navigate("FeedEvent");
    };

    changeTab = index => {
        this.props.selectCity(index);
        this.setState({
            tabSelected: index
        });
    };

    render() {
        let FILTERS = Object.values(CityFilter);

        return (
            <View style={{ flex: 1 }}>
                <Header title={"Open Tables"} leftComponent={() => null} />
                <Tabs
                    tabSelected={index => this.changeTab(index)}
                    activeTab={this.state.tabSelected}
                    tabs={FILTERS}
                />
                <EventList
                    style={{ height: "100%" }}
                    onPress={this.onPress}
                    events={this.props.events}
                    loading={this.props.initialLoad}
                />
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
    const selectEvent = (eventId, mode) => {
        dispatch({
            type: eventTypes.SELECT_EVENT,
            payload: {
                eventId,
                mode,
                parentRoute: "Feed"
            }
        });
    };

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
        selectCity,
        selectEvent
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feed);
