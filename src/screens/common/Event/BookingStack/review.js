import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import NavigationService from "Homecooked/src/utils/NavigationService";
import HeadingText from "Homecooked/src/components/Text/Heading";
import CloseButton from "Homecooked/src/components/Buttons/Close";
import BarButton from "Homecooked/src/components/Buttons/BarButton";
import InfoSection from "Homecooked/src/components/Event/Info";

import { createToken, formatCardDetails } from "Homecooked/src/services/stripe";
import { eventTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import { LiteCreditCardInput } from "react-native-credit-card-input";

import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

class Review extends Component {
    state = {
        modules: ["dateTime", "price"],
        cardDetails: {}
    };

    _goBack = () => {
        NavigationService.navigate("Event");
    };

    componentWillReceiveProps(nextProps) {
        if (
            this.props.actionLoading &&
            !nextProps.actionLoading &&
            !nextProps.error
        ) {
            this.props.navigation.navigate("Confirmed");
        }
    }

    _onChange = form =>
        this.setState({
            cardDetails: form
        });

    _goNext = () => {
        let { id } = this.props.navigation.state.params.event;
        // TODO: payment token placeholder
        this.props.bookEvent("123");
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
                <View style={styles.cardInputContainer}>
                    <LiteCreditCardInput onChange={this._onChange} />
                </View>

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
    const { events } = state;
    return {
        actionLoading: events.actionLoading,
        error: events.error
    };
};

const mapDispatchToProps = dispatch => {
    const bookEvent = paymentToken => {
        dispatch({
            type: eventTypes.BOOK_EVENT_REQUEST,
            payload: {
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
    },
    cardInputContainer: {
        marginHorizontal: Spacing.large
    }
});
