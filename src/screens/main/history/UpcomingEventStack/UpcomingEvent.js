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
import { historyTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import NavigationService from "Homecooked/src/utils/NavigationService";

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

class UpcomingEvent extends Component {
    state = {
        modules: ["dateTime", "location", "description", "refundPolicy"]
    };

    componentDidMount() {
        console.log(this.props.navigation.state.params.event);
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.refundInProgress &&
            !nextProps.refundInProgress &&
            !nextProps.error
        ) {
            NavigationService.navigate("HistoryMain");
        }
    }

    refund = () => {
        let { id } = this.props.navigation.state.params.event.userBooking;
        this.props.refundBooking(id);
    };

    render() {
        let {
            title,
            date,
            distance,
            price,
            startTime,
            description,
            menu,
            marker,
            key
        } = this.props.navigation.state.params.event;
        let { refundInProgress } = this.props;
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
                    <HeroSection
                        title={title}
                        chefName={"Nick"}
                        chefDescription={`Nick is a graduating senior at Yale passionate about food sustainability and agriculture. He recently returned from a gap year in Hong Kong and can’t wait share the incredible new recipes he picked up there!`}
                    />
                    <Separator />
                    <InfoSection
                        modules={this.state.modules}
                        startTime={startTime}
                        description={description}
                        price={price}
                    />
                    <PeopleRow people={people} />
                    <Separator />
                    <MenuSection title={"What's cooking?"} menu={menu} />
                    <Separator />
                    <LocationSection lat={lat} lng={lng} />
                    <Separator />
                    <RatingSection />
                </ScrollView>
                <UtilityBar
                    mainTextColor={Color.green}
                    buttonColor={Color.orange}
                    mainText={"Status: Booked"}
                    subText={"Happening in 3 days"}
                    buttonText={"Refund"}
                    onPress={this.refund}
                    loading={refundInProgress}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { history } = state;
    return {
        refundInProgress: history.refundInProgress,
        error: history.error
    };
};

const mapDispatchToProps = dispatch => {
    const refundBooking = bookingId => {
        dispatch({
            type: historyTypes.REFUND_BOOKING_REQUEST,
            bookingId
        });
    };
    return {
        refundBooking
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpcomingEvent);
