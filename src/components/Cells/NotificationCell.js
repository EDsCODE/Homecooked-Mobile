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
        let { onPress, style, key, source, title, prompt } = this.props;
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
                        <Text style={styles.prompt}>{"2h"}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
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
