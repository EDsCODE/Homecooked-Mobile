import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import CheckBox from "react-native-check-box";
import { Typography, Spacing, Color } from "Homecooked/src/components/styles";

export default class CheckBoxes extends Component {
    selectBox = key => {
        this.props.onBoxSelected(key);
    };

    render() {
        let { dict, title, containerStyle } = this.props;
        return (
            <View style={containerStyle}>
                <View style={styles.column}>
                    {title ? (
                        <Text style={styles.columnTitle}>{title}</Text>
                    ) : null}
                    {Object.keys(dict).map(key => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    this.selectBox(key);
                                }}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 15,
                                    marginRight: Spacing.largest
                                }}
                            >
                                <CheckBox
                                    style={{ paddingRight: 10 }}
                                    checkBoxColor={Color.lightGray}
                                    checkedCheckBoxColor={Color.orange}
                                    isChecked={dict[key]}
                                    onClick={() => {
                                        this.selectBox(key);
                                    }}
                                />
                                <Text
                                    style={{
                                        fontFamily: "Avenir",
                                        fontSize: 16,
                                        fontWeight: "300"
                                    }}
                                >
                                    {key}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.largest,
        backgroundColor: Color.white,
        flex: 1
    },
    header: {
        ...Typography.screenHeader,
        marginTop: Spacing.larger
    },
    note: {
        ...Typography.bodyText,
        marginVertical: Spacing.large
    },
    column: {
        marginRight: Spacing.extraLarge,
        flexWrap: "wrap"
    },
    columnTitle: {
        ...Typography.header,
        marginBottom: Spacing.large
    }
});
