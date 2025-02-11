import React, { PureComponent } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";

export default class NotificationCell extends PureComponent {
    state = {
        width: 0,
        height: 0
    };

    _onLayout = event => {
        let { width, height } = event.nativeEvent.layout;
        this.setState({
            width,
            height
        });
    };

    _renderImage = (width, source) => {
        let imageDim = width / 6.5;
        return (
            <FastImage
                style={{
                    height: imageDim,
                    width: imageDim,
                    borderRadius: imageDim / 2,
                    marginHorizontal: Spacing.smaller,
                    borderWidth: 1,
                    borderColor: Color.black
                }}
                source={{
                    uri: source,
                    priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
        );
    };

    render() {
        let {
            onPress,
            style,
            key,
            source,
            title,
            prompt,
            createdAt
        } = this.props;
        let timeSinceText = timeSince(createdAt);
        return (
            <TouchableOpacity
                onPress={onPress}
                style={style}
                key={key}
                onLayout={this._onLayout}
            >
                <View style={styles.row}>
                    {this._renderImage(this.state.width, source)}
                    <View style={styles.content}>
                        <Text style={styles.title}>{prompt}</Text>
                        <Text style={styles.prompt}>{timeSinceText}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

function timeSince(createdAt) {
    let date = new Date(createdAt);
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + "yr";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + "mo";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + "d";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + "hr";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + "m";
    }
    return Math.floor(seconds) + " seconds";
}

const styles = StyleSheet.create({
    row: {
        marginVertical: Spacing.base,
        marginHorizontal: Spacing.small,
        flexDirection: "row"
    },
    title: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.smallFontSize
    },
    content: {
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        marginHorizontal: Spacing.small
    },
    prompt: {
        fontFamily: Typography.fontFamily,
        fontSize: Typography.smallFontSize,
        color: Color.lightGray
    },
    image: {}
});
