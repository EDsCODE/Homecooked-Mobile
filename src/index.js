/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import NavigationService from './utils/NavigationService';
import TopLevelNavigator from './screens';

import { Provider } from 'react-redux';
import store from 'Homecooked/src/modules';

import { UrbanAirship } from 'urbanairship-react-native';

const AppContainer = createAppContainer(TopLevelNavigator);

export default class App extends Component {
    constructor(props) {
        super(props);
        UrbanAirship.setUserNotificationsEnabled(true);
    }

    render() {
        return (
            <Provider store={store}>
                <AppContainer
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </Provider>
        );
    }
}
