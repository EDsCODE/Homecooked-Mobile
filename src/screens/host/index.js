import React, { Component } from 'react';
import { Linking } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Tables from './tables';
// import Ratings from "./ratings";
// import Notifications from "./notifications";
import Account from './account';

import { stringUtils } from 'Homecooked/src/utils';

import { connect } from 'react-redux';
import { hostTypes } from 'Homecooked/src/modules/types';

const HostStack = createBottomTabNavigator(
    {
        HostTables: {
            screen: Tables
        },
        HostAccount: {
            screen: Account
        }
    },
    {
        initialRouteName: 'HostTables',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                var imgSource;
                if (routeName === 'HostTables') {
                    // Sometimes we want to add badges to some icons.
                    // You can check the implementation below.
                    imgSource = require('Homecooked/src/assets/img/HMyTables.png');
                } else if (routeName === 'HostAccount') {
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
    }
);

class HostMain extends Component {
    static router = HostStack.router;

    componentDidMount() {
        Linking.addEventListener('url', this._handleOpenURL);
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this._handleOpenURL);
    }

    _handleOpenURL = event => {
        let parsed = stringUtils.parseURL(event.url);
        parsed;
        if (parsed.params.stripe_account_id) {
            this.props.updateStripeAccountId(parsed.params.stripe_account_id);
        }
    };

    render() {
        const { navigation } = this.props;
        return <HostStack navigation={navigation} />;
    }
}

const mapDispatchToProps = dispatch => {
    const updateStripeAccountId = stripeAccountId => {
        dispatch({
            type: hostTypes.UPDATE_ACCOUNT_ID,
            payload: { stripeAccountId }
        });
    };
    return {
        updateStripeAccountId
    };
};

export default connect(
    null,
    mapDispatchToProps
)(HostMain);
