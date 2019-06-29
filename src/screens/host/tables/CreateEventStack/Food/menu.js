import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import HeadingText from 'Homecooked/src/components/Text/Heading';
import PromptText from 'Homecooked/src/components/Text/Prompt';
import CloseButton from 'Homecooked/src/components/Buttons/Close';
import BarButton from 'Homecooked/src/components/Buttons/BarButton';
import TextField from 'Homecooked/src/components/TextFields/Material';
import ActionButton from 'Homecooked/src/components/Buttons/Action';
import MenuSection from 'Homecooked/src/components/Event/Menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';
import NavigationService from 'Homecooked/src/utils/NavigationService';
import _ from 'lodash';

export default class Menu extends Component {
    _goBack = () => {
        this.props.navigation.goBack();
    };

    state = {
        itemName: '',
        itemDescription: '',
        menu: []
    };

    componentDidMount() {
        let { eventDescription } = this.props.screenProps.state;
        this.setState({
            eventDescription
        });
    }

    _addItem = () => {
        this.setState({
            menu: [
                ...this.state.menu,
                {
                    name: this.state.itemName,
                    description: this.state.itemDescription
                }
            ],
            itemName: '',
            itemDescription: ''
        });
    };

    _goNext = () => {
        let { menu } = this.state;
        this.props.screenProps.updateData('menu', menu);
        this._goBack();
    };

    _onRowPressed = item => {
        console.log(item);
        let menu = this.state.menu.filter(
            menuItem =>
                menuItem.name != item.name &&
                menuItem.description != item.description
        );
        console.log(menu);
        this.setState({
            menu
        });
    };

    render() {
        let { itemDescription, itemName, menu } = this.state;
        return (
            <View style={styles.container}>
                <CloseButton onPress={this._goBack} />
                <KeyboardAwareScrollView
                    extraScrollHeight={120}
                    extraHeight={50}
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <HeadingText>Menu</HeadingText>
                    <PromptText style={{ marginTop: Spacing.large }}>
                        The tastier your menu sounds, the easier it is to fill
                        your table! Once a menu item has been entered, you can
                        tap to edit.
                    </PromptText>
                    <MenuSection
                        menu={menu}
                        containerStyle={{ marginHorizontal: 0 }}
                        onRowPressed={this._onRowPressed}
                    />
                    <TextField
                        label={''}
                        tintColor="#4A4A4A"
                        placeholder="Menu Item"
                        value={itemName}
                        onChangeText={itemName => this.setState({ itemName })}
                    />
                    multiline={true}
                    returnKeyType="done" scrollEnabled={true}
                    blurOnSubmit={true}
                    enablesReturnKeyAutomatically={true}
                    <TextField
                        label={''}
                        tintColor="#4A4A4A"
                        placeholder="Description"
                        value={itemDescription}
                        onChangeText={itemDescription =>
                            this.setState({ itemDescription })
                        }
                        multiline={true}
                        returnKeyType="done"
                        scrollEnabled={true}
                        blurOnSubmit={true}
                        enablesReturnKeyAutomatically={true}
                    />
                    <ActionButton
                        title="Add Item"
                        style={{
                            alignSelf: 'center',
                            marginTop: Spacing.smaller
                        }}
                        borderColor={Color.orange}
                        fill={Color.orange}
                        onPress={this._addItem}
                        active={itemDescription && itemName}
                    />
                    <BarButton
                        title="Confirm"
                        style={{
                            marginVertical: Spacing.large
                        }}
                        borderColor={Color.orange}
                        fill={Color.orange}
                        onPress={this._goNext}
                        active={menu.length}
                    />
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: Spacing.large
    },
    input: {
        marginHorizontal: Spacing.large
    }
});
