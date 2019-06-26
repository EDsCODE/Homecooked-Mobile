import React, { Component, useState, useEffect } from "react";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";

import Placeholder, {
    Paragraph,
    Media,
    Line,
    ImageContent
} from "rn-placeholder";

import HistoryCell from "Homecooked/src/components/Cells/History";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

class CellList extends Component {
    _renderSeparator = () => (
        <View
            style={{
                borderBottomColor: Color.black,
                borderBottomWidth: 1,
                width: "90%",
                alignSelf: "center"
            }}
        />
    );

    render() {
        let { events, style, renderItem, keyExtractor } = this.props;

        return (
            <FlatList
                contentInset={{ bottom: 220 }}
                keyExtractor={keyExtractor}
                style={style}
                data={events}
                extraData={events}
                renderItem={renderItem}
                ItemSeparatorComponent={this._renderSeparator}
            />
        );
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
            whenReadyRender={() => <CellList {...props} />}
        >
            <Line width="70%" style={{ margin: Spacing.base }} />
            <Line style={{ margin: Spacing.base }} />
            <Line width="30%" style={{ margin: Spacing.base }} />
            <Line width="70%" style={{ margin: Spacing.base }} />
            <Line style={{ margin: Spacing.base }} />
            <Line width="30%" style={{ margin: Spacing.base }} />
            <Line width="70%" style={{ margin: Spacing.base }} />
            <Line style={{ margin: Spacing.base }} />
            <Line width="30%" style={{ margin: Spacing.base }} />
            <Line width="70%" style={{ margin: Spacing.base }} />
            <Line style={{ margin: Spacing.base }} />
            <Line width="30%" style={{ margin: Spacing.base }} />
        </Placeholder>
    );
});
