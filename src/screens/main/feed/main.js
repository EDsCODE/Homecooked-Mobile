import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import Header from "Homecooked/src/components/Headers/Basic";
import EventCell from "Homecooked/src/components/Cells/Event";

const sample = [
    {
        title: "Simple Classics",
        date: Date(),
        price: 16,
        distance: 0.9
    }
];

export default class Feed extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        this.setState({
            data: sample
        });
    }

    _keyExtractor = (item, index) => item.id;

    onPress = () => {
        this.props.navigation.navigate("EventStack");
    };

    _renderItem = ({ item }) => {
        return (
            <EventCell
                key={item.id}
                title={item.title}
                date={item.date}
                price={item.price}
                distance={item.distance}
                onPress={this.onPress}
            />
        );
    };

    render() {
        return (
            <View>
                <Header title={"Open Tables"} leftComponent={() => null} />
                <FlatList
                    keyExtractor={this._keyExtractor}
                    style={{ height: "100%" }}
                    data={this.state.data}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}
