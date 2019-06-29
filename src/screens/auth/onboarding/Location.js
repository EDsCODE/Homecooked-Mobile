import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import PrimaryText from 'Homecooked/src/components/Text/Primary';
import PromptText from 'Homecooked/src/components/Text/Prompt';
import BarButton from 'Homecooked/src/components/Buttons/BarButton';

import Permissions from 'react-native-permissions';
import NavigationService from 'Homecooked/src/utils/NavigationService';
import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';
import { Icon } from 'react-native-elements';

export default class Location extends Component {
    _goNext = () => {
        NavigationService.navigate('Main');
    };

    // Request permission to access photos
    _requestPermission = () => {
        Permissions.request('location').then(response => {
            this._goNext();
        });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Icon
                        name="ios-pin"
                        type="ionicon"
                        size={60}
                        color={Color.black}
                    />
                    <PrimaryText style={{ marginTop: Spacing.small }}>
                        Join nearby meals
                    </PrimaryText>

                    <PromptText
                        style={{
                            marginTop: Spacing.small,
                            textAlign: 'center',
                            marginHorizontal: Spacing.large
                        }}
                    >
                        We help you discover meals in your local neighorhood
                    </PromptText>
                    <BarButton
                        title="Enable Location"
                        style={{
                            position: 'absolute',
                            bottom: Spacing.large,
                            left: Spacing.large
                        }}
                        borderColor={Color.orange}
                        fill={Color.orange}
                        onPress={this._requestPermission}
                    />
                </View>
                <View>
                    <PromptText
                        style={{
                            marginBottom: Spacing.largest,
                            color: Color.black,
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                        onPress={this._goNext}
                    >
                        No Thanks
                    </PromptText>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
