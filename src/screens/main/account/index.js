import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from './main';
import HostApplication from './HostApplication';
import Settings from './Settings';
import Profile from './Profile';
import Payment from './Payment';
import Share from './Share';
import RatingStack from '../../common/RatingStack';
const AccountStack = createStackNavigator(
    {
        AccountMain: {
            screen: Main
        },
        HostApplication: {
            screen: HostApplication
        },
        Payment: {
            screen: Payment
        },
        Settings: {
            screen: Settings
        },
        Profile: {
            screen: Profile
        },
        Share: {
            screen: Share
        }
    },
    {
        initialRouteName: 'AccountMain',
        headerMode: 'none'
    }
);

// remove tabbar when a route is clicked in Account
AccountStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible
    };
};

export default AccountStack;
