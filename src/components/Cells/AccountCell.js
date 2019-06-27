import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';

const Cell = props => (
    <TouchableOpacity
        onPress={props.onPress}
        style={props.style}
        activeOpacity={1.0}
    >
        <View style={styles.row}>
            <Image
                style={styles.imgStyles}
                source={props.icon}
                resizeMode={'contain'}
            />
            <Text style={styles.title}>{props.title}</Text>
            {props.prompt ? (
                <Text style={styles.prompt}>{props.prompt}</Text>
            ) : null}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    row: {
        marginVertical: Spacing.base,
        flexDirection: 'row',
        alignItems: 'center'
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
    imgStyles: {
        width: 25,
        height: 25,
        marginRight: Spacing.base
    }
});

export default Cell;
