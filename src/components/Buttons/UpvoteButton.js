import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Color } from 'Homecooked/src/components/styles';
import Profile from '../../screens/main/account/Profile/Profile';

export default props => {
    let { value } = props;
    let topArrow, icon, bottomArrow;
    //let iconImage = require(props.iconImage);
    topArrow = icon = bottomArrow = Color.gray;

    if (value == -1) {
        topArrow = Color.gray;
        icon = Color.orange;
        bottomArrow = Color.orange;
    } else if (value == 1) {
        topArrow = Color.green;
        icon = Color.green;
        bottomArrow = Color.gray;
    }
    return props.active ? (
        <View style={styles.rating}>
            <TouchableOpacity
                onPress={() => props.onPress(props.id, 1)}
                style={props.style}
            >
                <View style={styles.upvoteButton}>
                    <Icon
                        name="chevron-up"
                        type="evilicon"
                        color={topArrow}
                        size={50}
                    />
                </View>
            </TouchableOpacity>
            {/* <Icon name="question" type="evilicon" color={icon} size={75} /> */}
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Image
                    source={props.iconImage}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        paddingBottom: 20
                    }}
                />
                <Text>{props.iconText}</Text>
            </View>

            <TouchableOpacity
                onPress={() => props.onPress(props.id, -1)}
                style={props.style}
            >
                <View style={styles.downvoteButton}>
                    <Icon
                        name="chevron-down"
                        type="evilicon"
                        color={bottomArrow}
                        size={50}
                    />
                </View>
            </TouchableOpacity>
        </View>
    ) : (
        <View style={styles.rating}>
            <View style={styles.upvoteButton}>
                <Icon
                    name="chevron-up"
                    type="evilicon"
                    color={topArrow}
                    size={50}
                />
            </View>

            {/* <Icon name="question" type="evilicon" color={icon} size={75} /> */}
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Image
                    source={props.iconImage}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        paddingBottom: 20
                    }}
                />
                <Text>{props.iconText}</Text>
            </View>
            <View style={styles.downvoteButton}>
                <Icon
                    name="chevron-down"
                    type="evilicon"
                    color={Color.gray}
                    size={50}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rating: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    upvoteButton: {
        backgroundColor: Color.white,
        color: Color.gray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    downvoteButton: {
        backgroundColor: Color.white,
        color: Color.gray,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
