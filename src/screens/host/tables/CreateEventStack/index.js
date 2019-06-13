import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Details from "./Details";
import Food from "./Food";
import Logistics from "./Logistics";
import Preview from "./Preview";
import moment from "moment";
import { connect } from "react-redux";
import { hostTypes } from "Homecooked/src/modules/types";
import * as hostSelectors from "Homecooked/src/modules/host/selectors";
import { EventTypes } from "Homecooked/src/types";

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
        Preview: {
            screen: Preview
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
        food: {}
    };

    updateData = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    submit = () => {
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
                    fields: fields
                }}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        fields: hostSelectors.getEventFields(state)
    };
};

const mapDispatchToProps = dispatch => {
    const postEvent = eventData => {
        dispatch({
            type: hostTypes.POST_EVENT_REQUEST,
            payload: eventData
        });
    };
    return {
        postEvent
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
