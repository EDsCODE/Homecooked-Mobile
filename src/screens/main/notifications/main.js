import React, { Component } from "react";
import { View, FlatList } from "react-native";
import Header from "Homecooked/src/components/Headers/Basic";
import Separator from "Homecooked/src/components/Separator";
import { NotificationCell } from "Homecooked/src/components/Cells";
import { notificationTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

import { historyTypes, eventTypes } from "Homecooked/src/modules/types";
import { EventViewTypes } from "Homecooked/src/types";

import { getNotificationsWithEvent } from "Homecooked/src/modules/notification/selectors";

let content = [
    {
        title: "New event invite",
        prompt: "Join the event",
        source: "https://picsum.photos/id/200/320/240"
    },
    {
        title: "New event invite",
        prompt:
            "A Pakistani Feast: someone left you a review. Want to check it out?",
        source: "https://picsum.photos/id/200/320/240"
    }
];

class NotificationMain extends Component {
    _keyExtractor = (item, index) => item.id;

    componentDidMount() {
        this.props.loadNotifications();
    }

    _renderRow = ({ item }) => {
        return (
            <NotificationCell
                title={item.message}
                prompt={item.message}
                source={item.event.images[0]}
                onPress={() => this._onPress(item.event.id)}
            />
        );
    };

    _onPress = id => {
        this.props.selectEvent(id);
    };

    _renderSeparator = () => <Separator />;

    render() {
        return (
            <View>
                <Header title={"Notification"} leftComponent={() => null} />
                <FlatList
                    keyExtractor={this._keyExtractor}
                    style={{ height: "100%" }}
                    data={this.props.notifications}
                    renderItem={this._renderRow}
                    ItemSeparatorComponent={this._renderSeparator}
                />
            </View>
        );
    }
}

const mapDisptchToProps = dispatch => {
    const selectEvent = eventId => {
        dispatch({
            type: eventTypes.SELECT_EVENT,
            payload: {
                eventId,
                mode: EventViewTypes.FEED,
                parentRoute: "NotificationMain"
            }
        });
    };

    const loadNotifications = () => {
        dispatch({ type: notificationTypes.GET_NOTIFICATIONS_REQUEST });
    };

    return {
        loadNotifications,
        selectEvent
    };
};

const mapStateToProps = state => {
    return {
        notifications: getNotificationsWithEvent(state)
    };
};

export default connect(
    mapStateToProps,
    mapDisptchToProps
)(NotificationMain);
