import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import Header from 'Homecooked/src/components/Headers/Basic';
import Separator from 'Homecooked/src/components/Separator';
import { NotificationCell } from 'Homecooked/src/components/Cells';
import { notificationTypes } from 'Homecooked/src/modules/types';
import { connect } from 'react-redux';

import { historyTypes, eventTypes } from 'Homecooked/src/modules/types';

import CellList from 'Homecooked/src/components/List/CellList';
import EmptyComponent from 'Homecooked/src/components/List/EmptyComponent';

import { getGuestNotificationsWithEvent } from 'Homecooked/src/modules/notification/selectors';

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
                source={item.event.images[0]}
                onPress={() => this._onPress(item.event)}
            />
        );
    };

    _onPress = event => {
        this.props.selectEvent(event.id, event.mode);
        this.props.navigation.navigate('NotificationMainEvent');
    };

    _renderSeparator = () => <Separator />;

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title={'Notifications'} leftComponent={() => null} />
                {this.props.initialLoad ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        style={{ height: '100%' }}
                        data={this.props.notifications}
                        extraData={this.props.notifications}
                        renderItem={this._renderRow}
                        refreshing={this.props.loading}
                        onRefresh={this._onRefresh}
                        ItemSeparatorComponent={this._renderSeparator}
                        ListEmptyComponent={() => (
                            <EmptyComponent>
                                {'No Notifications'}
                            </EmptyComponent>
                        )}
                    />
                )}
                <CellList />
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
                parentRoute: 'NotificationMain'
            }
        });
    };

    const loadNotifications = () => {
        dispatch({
            type: notificationTypes.GET_NOTIFICATIONS_REQUEST,
            userType: 'GUEST'
        });
    };

    return {
        loadNotifications,
        selectEvent
    };
};

const mapStateToProps = state => {
    return {
        loading: state.notifications.loading,
        initialLoad: state.notifications.initialLoad,
        notifications: getGuestNotificationsWithEvent(state)
    };
};

export default connect(
    mapStateToProps,
    mapDisptchToProps
)(NotificationMain);
