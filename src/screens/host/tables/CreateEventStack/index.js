import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Details from "./Details";
import Food from "./Food";
import Logistics from "./Logistics";
import { connect } from "react-redux";
import { hostTypes, eventTypes } from "Homecooked/src/modules/types";
import * as hostSelectors from "Homecooked/src/modules/host/selectors";
import { EventTypes, EventViewTypes } from "Homecooked/src/types";

import Event from "Homecooked/src/screens/common/Event";

const CreateEventStack = createStackNavigator(
    {
        CreateEventDetails: {
            screen: Details
        },
        CreateEventLogistics: {
            screen: Logistics
        },
        CreateEventFood: {
            screen: Food
        },
        CreateEventLogisticsEvent: {
            screen: Event
        }
    },
    {
        initialRouteName: "CreateEventDetails",
        headerMode: "none"
    }
);

class CreateEvent extends Component {
    static router = CreateEventStack.router;

    state = {
        details: {},
        logistics: {},
        food: {},
        payload: {}
    };

    updateData = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    _formatData = () => {
        let fields = this.props.fields;
        let payload = {
            ...this.state.details,
            ...this.state.food,
            ...this.state.logistics,
            [EventTypes.PRICE]: [
                {
                    settingId: fields[EventTypes.PRICE].id,
                    allowedSettingValueId: null,
                    unconstrainedValue: this.state.logistics.price
                }
            ],
            [EventTypes.TABLE_SIZE_MIN]: [
                {
                    settingId: fields[EventTypes.TABLE_SIZE_MIN].id,
                    unconstrainedValue: this.state.logistics.minGuests
                }
            ],
            [EventTypes.TABLE_SIZE_MAX]: [
                {
                    settingId: fields[EventTypes.TABLE_SIZE_MAX].id,
                    unconstrainedValue: this.state.logistics.maxGuests
                }
            ],
            [EventTypes.DIETARY_RESTRICTION]: formatConstrainedValue(
                this.state.food.restrictions,
                fields[EventTypes.DIETARY_RESTRICTION]
            ),
            [EventTypes.MEAL_TYPE]: formatConstrainedValue(
                this.state.food.mealType,
                fields[EventTypes.MEAL_TYPE]
            )
        };
        return payload;
    };

    _formatPreview = () => {
        console.log(this.state);
        let { details, logistics, food } = this.state;
        let { eventTitle, eventDescription } = details;
        let { menu, mealType, restrictions } = food;
        let {
            address,
            duration,
            maxGuests,
            minGuests,
            price,
            specialDirections,
            startTime
        } = logistics;
        let payload = {};
        let marker = {};
        marker.formattedAddress = address.formattedAddress;
        marker.point = {};
        marker.point.coordinates = [address.geometry.lat, address.geometry.lng];
        let attributes = {};
        attributes.price = price;
        attributes.tableSizeMax = maxGuests;
        attributes.tableSizeMin = minGuests;
        attributes.dietaryRestriction = Object.values(restrictions).filter(
            item => item.selected
        );
        attributes.mealType = Object.values(mealType).filter(
            item => item.selected
        );

        let chef = {};
        chef.user = this.props.currentUser;

        let media = Object.values(this.props.currentHost.media).map(
            media => media.url
        );

        payload = {
            title: eventTitle,
            description: eventDescription,
            attributes,
            marker,
            duration,
            menu,
            startTime: startTime.toISOString(),
            specialDirections,
            chef,
            media,
            guestCount: 0
        };
        return payload;
    };

    preview = () => {
        let payload = this._formatPreview();
        this.props.previewEvent(payload);
    };

    submit = () => {
        let payload = this._formatData();
        this.props.postEvent(payload);
    };

    render() {
        const { navigation, fields } = this.props;

        return (
            <CreateEventStack
                navigation={navigation}
                screenProps={{
                    updateData: this.updateData,
                    state: this.state,
                    submit: this.submit,
                    fields: fields,
                    preview: this.preview
                }}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        fields: hostSelectors.getEventFields(state),
        currentUser: state.currentUser,
        currentHost: state.host
    };
};

const mapDispatchToProps = dispatch => {
    const previewEvent = event => {
        dispatch({
            type: eventTypes.SELECT_EVENT,
            payload: {
                mode: EventViewTypes.PREVIEW,
                preview: event,
                parentRoute: "CreateEventLogistics"
            }
        });
    };

    const postEvent = eventData => {
        dispatch({
            type: hostTypes.POST_EVENT_REQUEST,
            payload: eventData
        });
    };
    return {
        postEvent,
        previewEvent
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateEvent);

// utils for formatting payload

function formatConstrainedValue(dictToFormat, field) {
    let result = [];
    Object.keys(dictToFormat).map(key => {
        if (dictToFormat[key].selected) {
            result.push({
                settingId: field.id,
                allowedSettingValueId: dictToFormat[key].id,
                unconstrainedValue: null
            });
        }
    });
    return result;
}

function formatUnconstrainedValue(dictToFormat, field) {}
