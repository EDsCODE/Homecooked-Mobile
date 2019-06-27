import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';

const BasicHeader = props => (
    <Header
        containerStyle={{
            backgroundColor: Color.white,
            justifyContent: 'space-around'
        }}
        leftComponent={
            props.leftComponent ? (
                props.leftComponent
            ) : (
                <TouchableWithoutFeedback
                    onPress={props.leftOnPress}
                    hitSlop={{ top: 100, bottom: 100, left: 100, right: 100 }}
                >
                    <Icon
                        name="ios-arrow-round-back"
                        type="ionicon"
                        containerStyle={{ marginLeft: Spacing.base }}
                        size={40}
                    />
                </TouchableWithoutFeedback>
            )
        }
        centerComponent={{
            text: props.title,
            style: { color: Color.black, fontFamily: Typography.fontFamily }
        }}
        rightComponent={
            props.rightComponent
                ? rightComponents[props.rightComponent](props)
                : null
        }
        props
    />
);

let rightComponents = {
    share: {
        icon: 'home',
        color: Color.white
    },
    next: props => (
        <TouchableWithoutFeedback
            onPress={props.rightOnPress}
            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
        >
            <Text
                style={{
                    color: Color.orange,
                    fontFamily: Typography.fontFamily,
                    marginRight: Spacing.smaller
                }}
            >
                Next
            </Text>
        </TouchableWithoutFeedback>
    ),
    new: props => (
        <TouchableWithoutFeedback
            onPress={props.rightOnPress}
            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
        >
            <Icon
                name="ios-add"
                type="ionicon"
                containerStyle={{ marginRight: Spacing.smaller }}
                size={30}
                color={Color.gray}
                onPress={props.rightOnPress}
            />
        </TouchableWithoutFeedback>
    )
};

export default BasicHeader;
