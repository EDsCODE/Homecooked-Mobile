import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Badge } from 'react-native-elements';
import { Color } from 'Homecooked/src/components/styles';

export default props => {
    let { value } = props;
    let badgeColor = Color.gray;

    if (value == 1) {
        badgeColor = Color.green;
    } else if (value == -1) {
        badgeColor = Color.orange;
    }

    return (
        <View style={props.styles}>
            <View />
        </View>
    );
};

const styles = StyleSheet.create({});
