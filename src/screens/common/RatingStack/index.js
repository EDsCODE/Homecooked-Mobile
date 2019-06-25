import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Info from "./info";
import Voting from "./voting";
import Review from "./review";

import { eventTypes } from "Homecooked/src/modules/types";
import { connect } from "react-redux";
import { getEvent } from "Homecooked/src/modules/event/selectors";

const RatingStack = createStackNavigator(
    {
        Info: {
            screen: Info
        },
        Voting: {
            screen: Voting
        },
        Review: {
            screen: Review
        }
    },
    {
        initialRouteName: "Voting",
        headerMode: "none"
    }
);

class ReviewEvent extends Component {
    static router = RatingStack.router;

    state = {
        ratings: [],
        review: ""
    };

    updateData = (key, value, cb) => {
        this.setState(
            {
                [key]: value
            },
            () => {
                typeof cb === "function" && cb();
            }
        );
    };

    submit = () => {
        let eventId = this.props.event.id;
        let chefId = this.props.event.chef.id;
        let { review, ratings } = this.state;
        this.props.leaveReview(eventId, chefId, review, ratings);
    };

    render() {
        const { navigation } = this.props;
        return (
            <RatingStack
                navigation={navigation}
                screenProps={{
                    ...this.props,
                    updateData: this.updateData,
                    ...this.state,
                    submit: this.submit
                }}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...getEvent(state)
    };
};

const mapDispatchToProps = dispatch => {
    let leaveReview = (eventId, chefId, review, ratings) => {
        dispatch({
            type: eventTypes.LEAVE_REVIEW_REQUEST,
            payload: {
                eventId,
                chefId,
                review,
                ratings
            }
        });
    };
    return {
        leaveReview
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewEvent);
