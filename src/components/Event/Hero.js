import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import MinorText from "Homecooked/src/components/Text/Minor";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";

import Placeholder, {
    Paragraph,
    Media,
    Line,
    ImageContent
} from "rn-placeholder";

const imageURI = "Homecooked/src/assets/img/filledTable.jpg";

class Hero extends Component {
    state = {
        activeSlide: 0
    };

    _renderImage = ({ item }) => {
        console.log(item);
        return (
            <FastImage
                style={styles.image}
                source={{
                    uri: item,
                    priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
        );
    };

    get pagination() {
        const { activeSlide } = this.state;
        let { media } = this.props;
        return (
            <Pagination
                dotsLength={media.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    paddingTop: Spacing.base,
                    paddingBottom: 0
                }}
                dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 0,
                    backgroundColor: "rgba(75, 75, 75, 1.00)"
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                    backgroundColor: "rgba(160, 160, 160, 1.00)"
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    render() {
        let { title, chefName, chefDescription, media } = this.props;
        return (
            <View>
                <View style={styles.carousel}>
                    <Carousel
                        data={media}
                        extraData={media}
                        renderItem={this._renderImage}
                        sliderWidth={Spacing.deviceWidth}
                        itemWidth={Spacing.deviceWidth}
                        layout="default"
                        inactiveSlideScale={1.0}
                        onSnapToItem={index =>
                            this.setState({ activeSlide: index })
                        }
                    />
                </View>
                {this.pagination}
                <View style={styles.textContainer}>
                    <PrimaryText>{title}</PrimaryText>
                    <MinorText>{`Hosted by ${chefName}`}</MinorText>
                    <MinorText style={{ marginTop: Spacing.small }}>
                        {chefDescription}
                    </MinorText>
                </View>
            </View>
        );
    }
}

export default (Compo = props => {
    const [isReady, setReady] = useState(false);

    useEffect(() => {
        if (!props.loading) {
            setTimeout(() => setReady(true), 500);
        }
    });

    return (
        <Placeholder
            animation="fade"
            style={{
                width: Spacing.deviceWidth,
                height: Spacing.deviceHeight - 50
            }}
            isReady={isReady}
            whenReadyRender={() => <Hero {...props} />}
        >
            <Media
                style={{
                    width: Spacing.deviceWidth,
                    height: Spacing.deviceWidth,
                    backgroundColor: Color.lightestGray,
                    marginBottom: Spacing.base
                }}
            />
            <ImageContent
                animation="fade"
                position="top"
                hasRadius
                lineNumber={5}
                textSize={14}
                color={Color.lightestGray}
                width="100%"
                lastLineWidth="30%"
                firstLineWidth="10%"
            />
        </Placeholder>
    );
});

const styles = StyleSheet.create({
    carousel: {
        width: Spacing.deviceWidth,
        height: Spacing.deviceWidth
    },
    textContainer: {
        margin: Spacing.large
    },
    imageContainer: {
        flex: 1,
        alignItems: "center",
        overflow: "hidden"
    },
    image: {
        flex: 1,
        width: Spacing.deviceWidth,
        height: Spacing.deviceWidth
    }
});
