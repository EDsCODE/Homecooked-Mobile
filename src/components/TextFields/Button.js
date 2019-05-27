import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import { Icon } from "react-native-elements";
import MenuSection from "Homecooked/src/components/Event/Menu";

const FieldButton = props => (
    <TouchableOpacity
        style={props.containerStyle}
        onPress={props.onPress}
        activeOpacity={1.0}
    >
        {props.value && props.value.length > 0 ? (
            <View style={styles.filledContainer}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: -10
                    }}
                >
                    <Icon
                        name="ios-checkmark"
                        type="ionicon"
                        size={45}
                        color={Color.green}
                    />
                    <Text style={styles.title}>{props.title}</Text>
                </View>
                {Content(props.type, props.value)}
            </View>
        ) : (
            <View style={styles.unfilledContainer}>
                <Icon
                    name="ios-add"
                    type="ionicon"
                    size={25}
                    color={Color.white}
                    containerStyle={styles.iconContainer}
                />
                <Text style={styles.placeHolder}>{props.title}</Text>
            </View>
        )}
    </TouchableOpacity>
);

const Content = (type, value) => {
    switch (type) {
        case "menu":
            return (
                <MenuSection
                    menu={value}
                    containerStyle={{ marginHorizontal: 0 }}
                />
            );
        default:
            return <Text style={styles.mainText}>{value}</Text>;
    }
};

const styles = StyleSheet.create({
    unfilledContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Color.lightGray,
        flexDirection: "row",
        paddingVertical: Spacing.small,
        alignItems: "center",
        paddingHorizontal: Spacing.smaller
    },
    filledContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Color.black,
        flexDirection: "column",
        paddingVertical: Spacing.smallest,
        paddingHorizontal: Spacing.smallest
    },
    iconContainer: {
        width: 27,
        height: 27,
        borderRadius: 27 / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.orange,
        paddingTop: 2,
        paddingLeft: 1,
        shadowColor: Color.gray,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.5
    },
    placeHolder: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.baseFontSize,
        color: Color.lightGray,
        marginLeft: Spacing.small
    },
    title: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.smallFontSize,
        color: Color.lightGray,
        marginLeft: Spacing.smaller
    },
    mainText: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.baseFontSize,
        color: Color.black
    }
});

export default FieldButton;
