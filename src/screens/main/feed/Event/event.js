import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import HeroSection from "Homecooked/src/components/Event/Hero";
import MenuSection from "Homecooked/src/components/Event/Menu";
import InfoSection from "Homecooked/src/components/Event/Info";
import PeopleRow from "Homecooked/src/components/Image/Row";
import RatingSection from "Homecooked/src/components/Event/Ratings";
import Header from "Homecooked/src/components/Headers/Basic";
import UtilityBar from "Homecooked/src/components/Buttons/UtilityBar";
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

export default class Event extends Component {
    state = {
        modules: ["dateTime", "location", "description", "refundPolicy"]
    };
    _navigateToCreateProfile = () => {
        this.props.navigation.navigate("BookingStack");
    };

    render() {
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
                    <MenuSection />
                    <Separator />
                    <LocationSection />
                    <Separator />
                    <RatingSection />
                </ScrollView>
                <UtilityBar
                    mainTextColor={Color.green}
                    buttonColor={Color.green}
                    mainText={"$16 / person"}
                    subText={"2 seats left"}
                    buttonText={"RSVP"}
                    onPress={this._navigateToCreateProfile}
                />
            </View>
        );
    }
}
