import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from './main';
import Event from 'Homecooked/src/screens/common/Event';
const FeedStack = createStackNavigator(
    {
        Feed: {
            screen: Main
        },
        FeedEvent: {
            screen: Event
        }
    },
    {
        initialRouteName: 'Feed',
        headerMode: 'none'
    }
);

// remove tabbar when a route is clicked in settings
FeedStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;

    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible
    };
};

export default FeedStack;
