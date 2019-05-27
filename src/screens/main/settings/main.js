import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import HeaderCell from "Homecooked/src/components/Cells/SettingsHeaderCell";
import Cell from "Homecooked/src/components/Cells/SettingsCell";
import NavigationService from "Homecooked/src/utils/NavigationService";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    settingRows = [
        {},
        {
            title: "Switch to Host Mode",
            onPress: () => NavigationService.navigate("Host")
        },
        {
            title: "Payment"
        },
        {
            title: "Invite Friends",
            prompt: "Earn $3 for each friend who attends a meal"
        },
        {
            title: "Refer a host",
            prompt: "Earn $8 for each new host you refer"
        },
        {
            title: "FAQ"
        },
        {
            title: "Settings"
        }
    ];

    componentDidMount() {
        this.setState({
            data: this.settingRows
        });
    }

    _renderItem = ({ item, index }) => {
        console.log(index);
        if (index == 0) {
            // render header cell
            return <HeaderCell id={item.id} name="Eric" />;
        } else {
            return (
                <Cell
                    id={item.id}
                    title={item.title}
                    prompt={item.prompt}
                    onPress={item.onPress}
                />
            );
        }
    };

    _keyExtractor = (item, index) => item.id;

    _renderSeparator = () => (
        <View
            style={{
                borderBottomColor: Color.lightestGray,
                borderBottomWidth: 1
            }}
        />
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                    bounces={false}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Spacing.larger,
        marginHorizontal: 22
    }
});
