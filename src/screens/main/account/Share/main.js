import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import HeaderCell from "Homecooked/src/components/Cells/AccountHeaderCell";
import Header from "Homecooked/src/components/Headers/Basic";
import Cell from "Homecooked/src/components/Cells/AccountCell";
import NavigationService from "Homecooked/src/utils/NavigationService";

import { hostTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import branch, { BranchEvent } from 'react-native-branch';
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

class ShareMain extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    _goBack = () => {
        NavigationService.navigate("AccountMain");
    };

    componentDidMount() {
        let settingRows = [
            {
                title: "Messages"
            },
            {
                title: "Instagram Stories"
            },
            {
                title: "Facebook",
            },
            {
                title: "Messenger",
            },
            {
                title: "Twitter"
            },
            {
                title: "Copy Link",
            },
            {
                title: "More",
                onPress: () => this._goToShare()
            }
        ];
        this.setState({
            data: settingRows
        });
    }

    render() {
        return (
            <View>
                <Header title={"Share"} leftOnPress={this._goBack} />
            </View>
        );
    };

    _renderItem = ({ item, index }) => {
        return (
            <Cell
                id={item.id}
                title={item.title}
                prompt={item.prompt}
                onPress={item.onPress}
            />
          );
    };
    

    _keyExtractor = (item, index) => item.id;

    _renderSeparator = () => (
        <View
            style={{
                borderBottomColor: Color.lightestGray,
                borderBottomWidth: 1
            }}
        />
    );

    render() {
        return (
            <View style={styles.container}>
                <Header title={"Share"} leftOnPress={this._goBack} />
                <FlatList
                    data={this.state.data}
                    extraData={this.props}
                    ItemSeparatorComponent={this._renderSeparator}
                    renderItem={this._renderItem}
                    bounces={false}
                />
            </View>
        );
    }
}

export default connect(
    null,
    null
)(ShareMain);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: Spacing.larger,
        marginHorizontal: 22
    }
});
