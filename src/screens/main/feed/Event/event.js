import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import HeroSection from "Homecooked/src/components/Event/Hero";
import MenuSection from "Homecooked/src/components/Event/Menu";
import InfoSection from "Homecooked/src/components/Event/Info";
import RatingSection from "Homecooked/src/components/Event/Ratings";
import Header from "Homecooked/src/components/Headers/Basic";
import UtilityBar from "Homecooked/src/components/Buttons/UtilityBar";
import LocationSection from "Homecooked/src/components/Event/Location";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import Separator from "Homecooked/src/components/Separator";

export default class Feed extends Component {
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
                    <InfoSection />
                    <Separator />
                    <MenuSection />
                    <Separator />
                    <LocationSection />
                    <Separator />
                    <RatingSection />
                </ScrollView>
                <UtilityBar
                    color={Color.green}
                    mainText={"$16 / person"}
                    subText={"2 seats left"}
                    buttonText={"RSVP"}
                />
            </View>
        );
    }
}
