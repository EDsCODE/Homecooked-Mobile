import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import SecondaryText from "Homecooked/src/components/Text/Secondary";
import MinorText from "Homecooked/src/components/Text/Minor";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import { Icon } from "react-native-elements";

import moment from "moment";

export default class Info extends Component {
    render() {
        let _modules = this.props.modules;
        return (
            <View style={styles.container}>
                {_modules.map((item, index) => {
                    return modules[item](this.props, index.toString());
                })}
            </View>
        );
    }
}

const ModuleScaffold = props => (
    <View style={styles.rowContainer}>
        <View>
            <Icon
                name={`ios-${props.iconName}`}
                type="ionicon"
                size={30}
                containerStyle={{ width: 35, justifyContent: "center" }}
            />
        </View>
        <View
            style={{
                flexDirection: "column",
                marginHorizontal: Spacing.large,
                flex: 1
            }}
        >
            <SecondaryText>{props.title}</SecondaryText>
            {props.children}
        </View>
    </View>
);

const modules = {
    dateTime: (props, key) => {
        let date = props.startTime;
        let firstLine = moment(date).format("dddd, MMMM Do");
        let secondLine = `${moment(date).format("h:mm a")} - ${moment(date)
            .add(props.duration, "hours")
            .format("h:mm a")}`;
        return (
            <ModuleScaffold
                key={key}
                title={"Date and Time"}
                iconName={"calendar"}
            >
                <MinorText style={{ marginTop: Spacing.small }}>
                    {firstLine}
                </MinorText>
                <MinorText>{secondLine}</MinorText>
            </ModuleScaffold>
        );
    },
    description: (props, key) => (
        <ModuleScaffold key={key} title={"Description"} iconName={"clipboard"}>
            <MinorText style={{ marginTop: Spacing.small }}>
                {props.description}
            </MinorText>
        </ModuleScaffold>
    ),
    reminder: (props, key) => (
        <ModuleScaffold key={key} title={"Reminder"} iconName="clipboard">
            <MinorText style={{ marginTop: Spacing.small }}>
                Refunds must be requested at least 48 hours before to be
                processed.
            </MinorText>
        </ModuleScaffold>
    ),
    location: (props, key) => (
        <ModuleScaffold key={key} title={"Location"} iconName={"pin"}>
            <MinorText style={{ marginTop: Spacing.small }}>
                {props.formattedAddress}
            </MinorText>
        </ModuleScaffold>
    ),
    refundPolicy: (props, key) => (
        <ModuleScaffold key={key} title={"Refund Policy"} iconName="clipboard">
            <MinorText style={{ marginTop: Spacing.small }}>
                Refundable up to 2 days before event
            </MinorText>
        </ModuleScaffold>
    ),
    invite: (props, key) => (
        <ModuleScaffold key={key} title={"Invite Friends"} iconName="mail">
            <MinorText style={{ marginTop: Spacing.small }}>
                gathr events are meant to be shared.
            </MinorText>
        </ModuleScaffold>
    ),
    price: (props, key) => {
        let price = props.price;
        let tax = (price * 0.07).toFixed(2);
        let total = (parseFloat(price) + parseFloat(tax)).toFixed(2);
        return (
            <ModuleScaffold key={key} title={"Price"} iconName={"pricetag"}>
                <View style={styles.priceItemContainer}>
                    <SecondaryText style={styles.secondaryTextLeftExtraStyles}>
                        {`${props.chefName}'s Table:`}
                    </SecondaryText>
                    <SecondaryText style={styles.secondaryTextRightExtraStyles}>
                        {`$${price}`}
                    </SecondaryText>
                </View>
                <View style={styles.priceItemContainer}>
                    <SecondaryText style={styles.secondaryTextLeftExtraStyles}>
                        Tax:
                    </SecondaryText>
                    <SecondaryText style={styles.secondaryTextRightExtraStyles}>
                        {`$${tax}`}
                    </SecondaryText>
                </View>
                <View style={styles.border} />
                <View style={styles.priceItemContainer}>
                    <SecondaryText style={styles.secondaryTextLeftExtraStyles}>
                        Total:
                    </SecondaryText>
                    <SecondaryText style={styles.secondaryTextRightExtraStyles}>
                        {`$${total}`}
                    </SecondaryText>
                </View>
            </ModuleScaffold>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.large,
        marginVertical: Spacing.smaller
    },
    rowContainer: {
        marginTop: Spacing.base,
        flexDirection: "row"
    },
    textContainer: {
        margin: Spacing.large
    },
    border: {
        borderBottomColor: Color.black,
        borderBottomWidth: 1,
        marginVertical: Spacing.smaller
    },
    priceItemContainer: {
        width: "100%",
        flexDirection: "row",
        marginVertical: Spacing.smallest
    },
    secondaryTextLeftExtraStyles: {
        flex: 1,
        textAlign: "left"
    },
    secondaryTextRightExtraStyles: {
        flex: 1,
        textAlign: "right"
    }
});
