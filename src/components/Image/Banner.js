import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text } from 'react-native';
import NavigationService from 'Homecooked/src/utils/NavigationService';
import HeadingText from 'Homecooked/src/components/Text/Heading';
import PromptText from 'Homecooked/src/components/Text/Prompt';
import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';
import { colors } from 'react-native-elements';
import { extendedDateWithMealType } from 'Homecooked/src/utils/Date';
import FastImage from 'react-native-fast-image';

export default props => {
    let { image } = props;

    return (
        <View style={styles.rectangle}>
            <FastImageBackground
                source={props.eventImage}
                style={styles.banner}
                resizeMode="cover"
                blurRadius={30}
                //flexDirection="row"
            >
                <FastImage
                    source={{ uri: props.eventImage }}
                    style={styles.eventPhoto}
                    //resizeMode="cover"
                />
                <View style={styles.textBox}>
                    <HeadingText style={{ color: Color.white, fontSize: 17 }}>
                        How was {props.eventName}?
                    </HeadingText>
                    <PromptText style={{ color: Color.white, fontSize: 12 }}>
                        {extendedDateWithMealType(props.eventDate)}
                    </PromptText>
                </View>
            </FastImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    rectangle: {
        flex: 0.5,
        width: Spacing.deviceWidth,
        height: undefined,
        flexDirection: 'row'
    },
    banner: {
        flex: 1,
        width: Spacing.deviceWidth,
        height: undefined,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    eventPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 15,
        overflow: 'hidden'
    },
    textBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
});
