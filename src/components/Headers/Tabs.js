import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default class Tabs extends Component {
    select = index => {
        this.props.tabSelected(index);
    };

    render() {
        let { activeTab, tabs } = this.props;
        return (
            <View ref={this.props.ref} style={styles.statusContainer}>
                {tabs.map((tab, index) => {
                    return (
                        <TouchableOpacity onPress={() => this.select(index)}>
                            <Text
                                style={[
                                    styles.tab,
                                    {
                                        paddingLeft: 18,
                                        fontWeight:
                                            activeTab == index ? "800" : null
                                    }
                                ]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusContainer: {
        top: 0,
        height: 45,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        borderBottomWidth: 1
    },
    tab: {
        fontFamily: "Avenir",
        fontSize: 16,
        height: 35
    }
});
