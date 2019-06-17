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
import { connect } from "react-redux";
import * as hostSelectors from "Homecooked/src/modules/host/selectors";
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

const BUTTON_TITLE = "Post Event";
const MENU_TITLE = "What's Cooking";

class Preview extends Component {
    state = {
        modules: ["dateTime", "location", "description", "refundPolicy"]
    };

    componentWillRecieveProps(nextProps) {
        if (
            this.props.postingInProgress &&
            !nextProps.postingInProgress &&
            !nextProps.error
        ) {
            NavigationService.navigate("HostTablesMain");
        }
    }

    _goNext = () => {
        this.props.screenProps.submit();
    };

    render() {
        let { logistics, food, details } = this.props.screenProps.state;
        let { eventTitle, eventDescription } = details;
        return (
            <View style={{ flex: 1 }}>
                <Header title={"Nick's Table"} />
                <ScrollView
                    bounces={false}
                    contentInset={{ bottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <HeroSection title={eventTitle} media={this.props.media} />
                    <Separator />
                    <InfoSection
                        modules={this.state.modules}
                        description={eventDescription}
                    />
                    <Separator />
                    <MenuSection title={MENU_TITLE} menu={food.menu} />
                    <Separator />
                    <LocationSection />
                </ScrollView>
                <BarButton
                    title={BUTTON_TITLE}
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

const mapStateToProps = state => {
    return {
        media: hostSelectors.media(state),
        postingInProgress: state.host.postingInProgress,
        error: state.host.error
    };
};

export default connect(
    mapStateToProps,
    null
)(Preview);
