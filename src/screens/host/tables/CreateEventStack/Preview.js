import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import HeroSection from "Homecooked/src/components/Event/Hero";
import MenuSection from "Homecooked/src/components/Event/Menu";
import InfoSection from "Homecooked/src/components/Event/Info";
import PeopleRow from "Homecooked/src/components/Image/Row";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import Header from "Homecooked/src/components/Headers/Basic";
import LocationSection from "Homecooked/src/components/Event/Location";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import Separator from "Homecooked/src/components/Separator";

const people = [
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    },
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    },
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    },
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    },
    {
        imageUri: require("Homecooked/src/assets/img/filledTable.jpg")
    }
];

export default class Preview extends Component {
    state = {
        modules: ["dateTime", "location", "description", "refundPolicy"]
    };

    componentDidMount() {
        console.log(this.props.screenProps.state);
    }

    _goNext = () => {
        this.props.screenProps.submit();
    };

    render() {
        let { logistics, food, details } = this.props.screenProps.state;
        return (
            <View style={{ flex: 1 }}>
                <Header title={"Nick's Table"} />
                <ScrollView
                    bounces={false}
                    contentInset={{ bottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <HeroSection />
                    <Separator />
                    <InfoSection modules={this.state.modules} />
                    <PeopleRow people={people} />
                    <Separator />
                    <MenuSection title={"What's cooking"} menu={food.menu} />
                    <Separator />
                    <LocationSection />
                </ScrollView>
                <BarButton
                    title="Post Event"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.orange}
                    fill={Color.orange}
                    onPress={this._goNext}
                />
            </View>
        );
    }
}
