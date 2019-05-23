import React, { Component } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import SecondaryText from "Homecooked/src/components/Text/Secondary";
import MinorText from "Homecooked/src/components/Text/Minor";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

const imageURI = "Homecooked/src/assets/img/filledTable.jpg";

export default class Ratings extends Component {
    reviews = [
        {
            name: "John",
            date: "Mar 19",
            review:
                "If you don’t try Nick’s food before you die, you can’t really say you’ve lived."
        },
        {
            name: "John",
            date: "Mar 19",
            review:
                "If you don’t try Nick’s food before you die, you can’t really say you’ve lived."
        }
    ];

    _renderItem = ({ item }) => {
        return <Row name={item.name} date={item.date} review={item.review} />;
    };

    _renderSeparator = () => (
        <View
            style={{
                borderBottomColor: Color.lightestGray,
                borderBottomWidth: 1,
                width: "100%"
            }}
        />
    );

    _renderFooter = () => (
        <View
            style={{
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderColor: Color.lightestGray,
                paddingVertical: Spacing.large,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <SecondaryText>Read all reviews</SecondaryText>
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <PrimaryText>Ratings and Reviews</PrimaryText>
                <MinorText>What to expect</MinorText>
                <FlatList
                    style={{ marginTop: Spacing.base }}
                    data={this.reviews}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListFooterComponent={this._renderFooter}
                />
            </View>
        );
    }
}
const Row = props => (
    <View style={styles.row}>
        <View style={{ flexDirection: "row" }}>
            <Image
                style={{
                    width: 55,
                    height: 55,
                    borderRadius: 55 / 2,
                    backgroundColor: "blue"
                }}
                source={require(imageURI)}
            />
            <View
                style={{ marginLeft: Spacing.base, justifyContent: "center" }}
            >
                <SecondaryText>{props.name}</SecondaryText>
                <MinorText>{props.date}</MinorText>
            </View>
        </View>
        <View style={{ marginTop: Spacing.base }}>
            <MinorText>{props.review}</MinorText>
        </View>
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
