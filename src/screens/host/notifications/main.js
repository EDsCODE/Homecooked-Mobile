import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import Header from "Homecooked/src/components/Headers/Basic";
import Separator from "Homecooked/src/components/Separator";
import { NotificationCell } from "Homecooked/src/components/Cells";
import { notificationTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

import { historyTypes, eventTypes } from "Homecooked/src/modules/types";

import EmptyComponent from "Homecooked/src/components/List/EmptyComponent";
import { getHostNotificationsWithEvent } from "Homecooked/src/modules/notification/selectors";

class NotificationMain extends Component {
    _keyExtractor = (item, index) => item.id;

    componentDidMount() {
        this.props.loadNotifications();
    }

    _onRefresh = () => {
        this.props.loadNotifications();
    };

    _renderRow = ({ item }) => {
        return (
            <NotificationCell
                title={item.message}
                prompt={item.message}
                createdAt={item.createdAt}
                source={item.event.images[0]}
                onPress={() => this._onPress(item.event)}
            />
        );
    };

    _onPress = event => {
        this.props.selectEvent(event.id, event.mode);
        this.props.navigation.navigate("NotificationMainEvent");
    };

    _renderSeparator = () => <Separator />;

    render() {
        return (
            <View>
                <Header title={"Notification"} leftComponent={() => null} />
                {this.props.initialLoad ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        style={{ height: "100%" }}
                        data={this.props.notifications}
                        extraData={this.props.notifications}
                        renderItem={this._renderRow}
                        onRefresh={this._onRefresh}
                        refreshing={this.props.loading}
                        ItemSeparatorComponent={this._renderSeparator}
                        ListEmptyComponent={() => (
                            <EmptyComponent>
                                {"No Notifications"}
                            </EmptyComponent>
                        )}
                    />
                )}
            </View>
        );
    }
}

const mapDisptchToProps = dispatch => {
    const selectEvent = (eventId, mode) => {
        dispatch({
            type: eventTypes.SELECT_EVENT,
            payload: {
                eventId,
                mode,
                parentRoute: "NotificationMain"
            }
        });
    };

    const loadNotifications = () => {
        dispatch({
            type: notificationTypes.GET_NOTIFICATIONS_REQUEST,
            userType: "HOST"
        });
    };

    return {
        loadNotifications,
        selectEvent
    };
};

const mapStateToProps = state => {
    return {
        initialLoad: state.notifications.initialLoad,
        loading: state.notifications.loading,
        notifications: getHostNotificationsWithEvent(state)
    };
};

export default connect(
    mapStateToProps,
    mapDisptchToProps
)(NotificationMain);
