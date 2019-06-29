import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

import PrimaryText from 'Homecooked/src/components/Text/Primary';
import PromptText from 'Homecooked/src/components/Text/Prompt';
import BarButton from 'Homecooked/src/components/Buttons/BarButton';

import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';
import NavigationService from 'Homecooked/src/utils/NavigationService';

export default class Finish extends Component {
    _goNext = () => {
        NavigationService.navigate('AccountMain');
    };

    render() {
        return (
            <View style={styles.container}>
                <PrimaryText>Thanks for applying!</PrimaryText>
                <PromptText
                    style={{ textAlign: 'center', marginTop: Spacing.small }}
                >
                    We'll text you to set up a time. Excited to talk soon!
                </PromptText>
                <BarButton
                    title="Finish"
                    style={{
                        position: 'absolute',
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.orange}
                    fill={Color.orange}
                    onPress={this._goNext}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.large
    }
});
