import { createBottomTabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Image } from 'react-native';
import Feed from './feed';
import HistoryStack from './history';
import Notifications from './notifications';
import Account from './account';
import { Color } from 'Homecooked/src/components/styles';

const MainStack = createBottomTabNavigator(
    {
        Feed: {
            screen: Feed
        },
        History: {
            screen: HistoryStack
        },
        Notification: {
            screen: Notifications
        },
        Account: {
            screen: Account
        }
    },
    {
        initialRouteName: 'Account',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                var imgSource;
                if (routeName === 'Feed') {
                    // Sometimes we want to add badges to some icons.
                    // You can check the implementation below.
                    imgSource = require('Homecooked/src/assets/img/GOpenTables.png');
                } else if (routeName === 'History') {
                    imgSource = require('Homecooked/src/assets/img/GMyTables.png');
                } else if (routeName === 'Notification') {
                    imgSource = require('Homecooked/src/assets/img/GHNotifs.png');
                } else if (routeName === 'Account') {
                    imgSource = require('Homecooked/src/assets/img/GHProfile.png');
                }

                // You can return any component that you like here!
                return (
                    <Image
                        source={imgSource}
                        style={{ width: 25, height: 25, tintColor }}
                    />
                );
            }
        }),
        tabBarOptions: {
            showIcon: true,
            activeTintColor: '#FF674F'
        }
    },
    {}
);

export default MainStack;
