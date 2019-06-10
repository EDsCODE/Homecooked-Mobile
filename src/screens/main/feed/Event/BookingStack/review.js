import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import NavigationService from "Homecooked/src/utils/NavigationService";
import HeadingText from "Homecooked/src/components/Text/Heading";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import InfoSection from "Homecooked/src/components/Event/Info";

import { feedTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

class Review extends Component {
    state = {
        modules: ["dateTime", "price"]
    };

    componentDidMount() {
        console.log(this.props);
    }

    _goBack = () => {
        NavigationService.navigate("Event");
    };

    componentWillReceiveProps(nextProps) {
        if (
            this.props.bookingInProgress &&
            !nextProps.bookingInProgress &&
            !nextProps.error
        ) {
            this.props.navigation.navigate("Confirmed");
        }
    }

    _goNext = () => {
        let { id } = this.props.navigation.state.params.event;
        // TODO: payment token placeholder
        this.props.bookEvent(id, "123");
    };

    render() {
        let { bookingInProgress } = this.props;
        return (
            <View style={{ flex: 1, paddingTop: 30 }}>
                <View style={styles.headerContainer}>
                    <CloseButton onPress={this._goBack} />
                    <HeadingText>Review</HeadingText>
                </View>
                <InfoSection modules={this.state.modules} />
                <BarButton
                    title="RSVP"
                    style={{
                        position: "absolute",
                        bottom: Spacing.large,
                        left: Spacing.large
                    }}
                    borderColor={Color.green}
                    fill={Color.green}
                    onPress={this._goNext}
                    loading={bookingInProgress}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { feed } = state;
    return {
        bookingInProgress: feed.bookingInProgress,
        error: feed.error
    };
};

const mapDispatchToProps = dispatch => {
    const bookEvent = (eventId, paymentToken) => {
        dispatch({
            type: feedTypes.BOOK_EVENT_REQUEST,
            payload: {
                eventId,
                paymentToken
            }
        });
    };
    return {
        bookEvent
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Review);

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: Spacing.large
    }
});
