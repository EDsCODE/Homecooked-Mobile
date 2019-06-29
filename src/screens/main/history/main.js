import React, { Component } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import Header from 'Homecooked/src/components/Headers/Basic';
import Tabs from 'Homecooked/src/components/Headers/Tabs';
import PromptText from 'Homecooked/src/components/Text/Prompt';
import HistoryCell from 'Homecooked/src/components/Cells/History';

import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';

import { historyTypes, eventTypes } from 'Homecooked/src/modules/types';
import { connect } from 'react-redux';
import {
    getUpcomingEvents,
    getPastEvents,
    orderEventsByDateEarliest,
    orderEventsByDateLatest
} from 'Homecooked/src/modules/history/selectors';

import EmptyComponent from 'Homecooked/src/components/List/EmptyComponent';

import { EventViewTypes } from 'Homecooked/src/types';
import BarButton from '../../../components/Buttons/BarButton';

class HistoryMain extends Component {
    state = {
        tabSelected: 0
    };

    componentDidMount() {
        this.props.loadHistory();
    }

    onPress = () => {
        this.props.navigation.navigate('EventStack');
    };

    _onRefresh = () => {
        this.props.loadHistory();
    };

    _renderUpcomingItem = ({ item, index }) => {
        let startTime = new Date(item.startTime);
        let endTime = new Date(startTime.getTime() + 60 * 60000);
        return (
            <HistoryCell
                key={item.id}
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
                    this.props.navigation.navigate('HistoryMainEvent');
                }}
            />
        );
    };

    _renderPastItem = ({ item }) => {
        let startTime = new Date(item.startTime);
        let endTime = new Date(startTime.getTime() + 60 * 60000);
        return (
            <HistoryCell
                key={item.id}
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
                    this.props.navigation.navigate('HistoryMainEvent');
                }}
                showUtility={item.mode == EventViewTypes.HISTORY_REVIEW}
                utilityOnPress={() => {
                    {
                        this.props.navigation.navigate('ReviewEvent');
                        this.props.selectEvent(item.id, item.mode);
                    }
                }}
                utilityColor={Color.green}
                utilityTitle={'Review'}
            />
        );
    };

    _keyExtractor = (item, index) => item.id;

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
                width: '90%',
                alignSelf: 'center'
            }}
        />
    );

    render() {
        return (
            <View>
                <Header title={'Your Tables'} leftComponent={() => null} />
                <View>
                    <Tabs
                        tabSelected={index => this.changeTab(index)}
                        activeTab={this.state.tabSelected}
                        tabs={['Upcoming', 'Past']}
                    />
                    {this.props.initialLoad ? (
                        <ActivityIndicator />
                    ) : this.state.tabSelected == 0 ? (
                        <FlatList
                            style={{ height: '100%' }}
                            data={this.props.upcomingEvents}
                            extraData={this.props.upcomingEvents}
                            cellTintColor={Color.orange}
                            onPress={this._rowOnPress}
                            loading={this.props.initialLoad}
                            renderItem={this._renderUpcomingItem}
                            keyExtractor={this._keyExtractor}
                            ItemSeparatorComponent={this._renderSeparator}
                            onRefresh={this._onRefresh}
                            refreshing={this.props.loading}
                            ListEmptyComponent={() => (
                                <View
                                    style={{ flex: 1, alignContent: 'center' }}
                                >
                                    <EmptyComponent
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        {'No Upcoming Tables'}
                                    </EmptyComponent>
                                    <PromptText
                                        style={{
                                            marginTop: 20,
                                            alignSelf: 'center',
                                            fontSize: 16
                                        }}
                                    >
                                        Hungry for adventure?
                                    </PromptText>
                                    <PromptText
                                        style={{
                                            alignSelf: 'center',
                                            textAlign: 'center',
                                            fontSize: 14
                                        }}
                                    >
                                        {
                                            'Tap "Feed" to explore meals near you.'
                                        }
                                    </PromptText>
                                </View>
                            )}
                        />
                    ) : (
                        <FlatList
                            style={{ height: '100%' }}
                            data={this.props.pastEvents}
                            extraData={this.props.pastEvents}
                            loading={this.props.initialLoad}
                            renderItem={this._renderPastItem}
                            keyExtractor={this._keyExtractor}
                            ItemSeparatorComponent={this._renderSeparator}
                            onRefresh={this._onRefresh}
                            refreshing={this.props.loading}
                            ListEmptyComponent={() => (
                                <View
                                    style={{ flex: 1, alignContent: 'center' }}
                                >
                                    <EmptyComponent
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        {'No Past Tables'}
                                    </EmptyComponent>
                                </View>
                            )}
                        />
                    )}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { history, events, currentBookings } = state;
    return {
        loading: history.loading,
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
                parentRoute: 'HistoryMain',
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
