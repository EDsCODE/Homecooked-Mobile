import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default class Tabs extends Component {
    select = index => {
        this.props.tabSelected(index);
    };

    render() {
        let { activeTab } = this.props;
        return (
            <View ref={this.props.ref} style={styles.statusContainer}>
                <TouchableOpacity onPress={() => this.select(0)}>
                    <Text
                        style={[
                            styles.tab,
                            {
                                paddingLeft: 18,
                                fontWeight: activeTab == 0 ? "800" : null
                            }
                        ]}
                    >
                        Upcoming
                    </Text>
                </TouchableOpacity>
                <Text style={[styles.tab]}>{" | "}</Text>
                <TouchableOpacity onPress={() => this.select(1)}>
                    <Text
                        style={[
                            styles.tab,
                            {
                                fontWeight: activeTab == 1 ? "800" : null
                            }
                        ]}
                    >
                        Past
                    </Text>
                </TouchableOpacity>
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
