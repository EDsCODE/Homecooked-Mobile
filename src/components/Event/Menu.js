import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import SecondaryText from "Homecooked/src/components/Text/Secondary";
import MinorText from "Homecooked/src/components/Text/Minor";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class Menu extends Component {
    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => {
        return (
            <Row
                key={item.id}
                name={item.name}
                description={item.description}
            />
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
        let { title, menu, containerStyle } = this.props;
        return (
            <View style={containerStyle ? containerStyle : styles.container}>
                {title ? <PrimaryText>{title}</PrimaryText> : null}
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={menu}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                    bounces={false}
                />
            </View>
        );
    }
}
const Row = props => (
    <View style={styles.row} key={props.key}>
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
