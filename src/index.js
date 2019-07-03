/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import NavigationService from "./utils/NavigationService";
import TopLevelNavigator from "./screens";
import codePush from "react-native-code-push";
import { Sentry } from "react-native-sentry";

import { Provider } from "react-redux";
import store from "Homecooked/src/modules";

Sentry.config(
    "https://ee6934666a7d44fd93ff513d1a675d5a@sentry.io/1493457"
).install();

const AppContainer = createAppContainer(TopLevelNavigator);

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

class App extends Component {
    constructor(props) {
        super(props);
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

export default codePush(codePushOptions)(App);
