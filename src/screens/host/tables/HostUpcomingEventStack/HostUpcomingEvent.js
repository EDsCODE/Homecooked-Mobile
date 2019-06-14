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
import { hostTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

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

const menu = [
    {
        name: "Xialong Bao",
        description: "Classic Soup dumplings"
    },
    {
        name: "Zhongzi",
        description:
            "Sticky rice dumplings with salted egg and pork nestled inside"
    }
];
class HostUpcomingEvent extends Component {
    state = {
        modules: ["dateTime", "location", "description", "refundPolicy"]
    };

    componentWillReceiveProps(nextProps) {
        if (
            this.props.cancelInProgress &&
            !nextProps.cancelInProgress &&
            !nextProps.error
        ) {
            NavigationService.navigate("HostTablesMain");
        }
    }

    onPress = () => {
        let eventId = this.props.navigation.state.params.event.id;
        this.props.cancelEvent(eventId);
    };

    _navigateToPerson = person => {
        this.props.navigation.navigate("HostUpcomingEventPerson", person);
    };

    render() {
        let {
            title,
            date,
            distance,
            startTime,
            description,
            menu,
            marker,
            key,
            attributes
        } = this.props.navigation.state.params.event;
        let { refundInProgress } = this.props;
        let { price, mealType, dietaryRestriction } = attributes;
        let { formattedAddress, secondaryAddress } = marker;
        let lat = marker.point.coordinates[0];
        let lng = marker.point.coordinates[1];
        return (
            <View style={{ flex: 1 }}>
                <Header title={"Nick's Table"} />
                <ScrollView
                    bounces={false}
                    contentInset={{ bottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <HeroSection title={title} />
                    <Separator />
                    <InfoSection
                        modules={this.state.modules}
                        startTime={startTime}
                        description={description}
                        price={price}
                        formattedAddress={formattedAddress}
                    />
                    <PeopleRow
                        people={people}
                        onPress={this._navigateToPerson}
                    />
                    <Separator />
                    <MenuSection
                        title={"What's cooking"}
                        menu={menu}
                        mealType={mealType}
                        dietaryRestriction={dietaryRestriction}
                    />
                    <Separator />
                    <LocationSection
                        lat={lat}
                        lng={lng}
                        formattedAddress={formattedAddress}
                        secondaryAddress={secondaryAddress}
                    />
                    <Separator />
                    <RatingSection />
                </ScrollView>
                <UtilityBar
                    mainTextColor={Color.green}
                    buttonColor={Color.orange}
                    mainText={"Status: Upcoming"}
                    subText={"1 week away"}
                    buttonText={"Cancel"}
                    onPress={this.onPress}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { history, events, currentBookings, host } = state;
    return {
        cancelInProgress: host.cancelInProgress,
        error: host.error
    };
};

const mapDispatchToProps = dispatch => {
    const cancelEvent = eventId => {
        dispatch({
            type: hostTypes.CANCEL_EVENT_REQUEST,
            eventId
        });
    };
    return {
        cancelEvent
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HostUpcomingEvent);
