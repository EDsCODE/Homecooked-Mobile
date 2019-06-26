import React, { Component, useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import Placeholder, {
    Paragraph,
    Media,
    Line,
    ImageContent
} from "rn-placeholder";

import EventCell from "Homecooked/src/components/Cells/Event";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

class EventList extends Component {
    _renderItem = ({ item }) => {
        let { onPress } = this.props;
        return <EventCell key={item.id} event={item} onPress={onPress} />;
    };

    render() {
        return <FlatList {...this.props} renderItem={this._renderItem} />;
    }
}

export default (Compo = props => {
    const [isReady, setReady] = useState(false);

    useEffect(() => {
        if (!props.loading) {
            setReady(true);
        }
    });
    return (
        <Placeholder
            animation="fade"
            style={{ flex: 1 }}
            isReady={isReady}
            whenReadyRender={() => <EventList {...props} />}
        >
            <Media
                style={{
                    marginTop: 20,
                    width: Spacing.deviceWidth - 30,
                    height: Spacing.deviceWidth - 30,
                    backgroundColor: Color.lightestGray,
                    alignSelf: "center"
                }}
            />
            <ImageContent
                style={{
                    marginVertical: Spacing.base,
                    marginHorizontal: Spacing.large
                }}
                animation="fade"
                position="top"
                hasRadius
                lineNumber={3}
                textSize={14}
                color={Color.lightestGray}
                width="100%"
                lastLineWidth="30%"
                firstLineWidth="10%"
            />
        </Placeholder>
    );
});
