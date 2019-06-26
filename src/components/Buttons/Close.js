import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';
import { Icon } from 'react-native-elements';

export default props => (
    <TouchableWithoutFeedback
        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
    >
        <Icon
            name={`ios-${props.icon || 'close'}`}
            type="ionicon"
            color={props.color ? props.color : Color.gray}
            size={55}
            containerStyle={{
                alignSelf: 'flex-start'
            }}
            onPress={props.onPress}
        />
    </TouchableWithoutFeedback>
);
