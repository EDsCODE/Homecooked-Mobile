import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

import OverlappingIcons from "Homecooked/src/components/Image/OverlappingIcons";
import { mealType } from "Homecooked/src/utils/Date";
import moment from "moment";

const people = [
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    },
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    },
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    },
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    },
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    }
];

export default class HistoryCell extends Component {
    render() {
        // format date
        let {
            startTime,
            endTime,
            title,
            key,
            style,
            onPress,
            upcoming
        } = this.props;
        let dayOfWeek = moment(startTime).format("dddd");
        let type = mealType(startTime);

        let startTimeParsed = moment(startTime).format("h A");
        let endTimeParsed = moment(endTime).format("h A");

        let month = moment(startTime).format("MMM");
        let day = moment(startTime).format("D");

        let subTitle = `${dayOfWeek} ${type}, ${startTimeParsed} to ${endTimeParsed}`;

        let color = upcoming ? Color.green : Color.orange;

        return (
            <TouchableOpacity onPress={onPress} style={style} key={title}>
                <View style={styles.row}>
                    <View
                        style={{
                            flexDirection: "column",
                            flex: 2.5,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text style={[styles.dateMonth, { color: color }]}>
                            {month}
                        </Text>
                        <Text style={styles.dateNumber}>{day}</Text>
                    </View>
                    <View style={{ flexDirection: "column", flex: 8 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.subTitle}>{subTitle}</Text>
                        </View>

                        <OverlappingIcons
                            people={people}
                            containerStyle={{ flex: 1 }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        paddingVertical: Spacing.base,
        paddingHorizontal: Spacing.small,
        flexDirection: "row",
        height: 130
    },
    title: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.buttonFontSize
    },
    prompt: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.smallFontSize,
        color: Color.lightGray
    },
    dateMonth: {
        color: Color.green,
        fontSize: Typography.smallFontSize,
        fontFamily: Typography.fontFamily,
        fontWeight: Typography.heavy
    },
    dateNumber: {
        color: Color.black,
        fontSize: Typography.extraLargeFontSize,
        fontFamily: Typography.fontFamily
    },
    title: {
        fontSize: Typography.baseFontSize,
        fontFamily: Typography.fontFamily
    },
    subTitle: {
        fontSize: Typography.smallFontSize,
        fontFamily: Typography.fontFamily,
        color: Color.gray
    }
});
