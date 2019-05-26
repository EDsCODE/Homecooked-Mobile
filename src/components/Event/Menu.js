import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import SecondaryText from "Homecooked/src/components/Text/Secondary";
import MinorText from "Homecooked/src/components/Text/Minor";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class Menu extends Component {
    menu = [
        {
            name: "Xialong Bao",
            description: "Classic Soup dumplings"
        },
        {
            name: "Zhongzi",
            description:
                "Sticky rice dumplings with salted egg and pork nestled inside"
        }
    ];

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item, index }) => {
        return (
            <Row id={index} name={item.name} description={item.description} />
        );
    };

    _renderSeparator = () => (
        <View
            style={{
                borderBottomColor: Color.lightestGray,
                borderBottomWidth: 1,
                width: 50
            }}
        />
    );

    render() {
        return (
            <View style={styles.container}>
                <PrimaryText>What's Cooking</PrimaryText>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={this.menu}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                />
            </View>
        );
    }
}
const Row = props => (
    <View style={styles.row}>
        <SecondaryText>{props.name}</SecondaryText>
        <MinorText>{props.description}</MinorText>
    </View>
);

const styles = StyleSheet.create({
    carousel: {
        width: Spacing.deviceWidth,
        height: Spacing.deviceWidth,
        backgroundColor: "blue"
    },
    container: {
        margin: Spacing.large
    },
    row: {
        marginVertical: Spacing.small
    }
});
