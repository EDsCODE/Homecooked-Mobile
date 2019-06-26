import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default props => {
    return props.active ? (
        <TouchableOpacity
            onPress={props.onPress}
            style={props.style}
            hitSlop={{ top: 50, bottom: 50, right: 25, left: 30 }}
        >
            <View style={styles.floatyButton}>
                <Icon
                    name="ios-arrow-round-forward"
                    type="ionicon"
                    color="white"
                    size={50}
                />
            </View>
        </TouchableOpacity>
    ) : (
        <View style={props.style}>
            <View style={[styles.floatyButton, { backgroundColor: 'gray' }]}>
                <Icon
                    name="ios-arrow-round-forward"
                    type="ionicon"
                    color="white"
                    size={50}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    floatyButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#FF674F',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
