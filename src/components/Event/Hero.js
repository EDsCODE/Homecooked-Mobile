import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

import PrimaryText from "Homecooked/src/components/Text/Primary";
import MinorText from "Homecooked/src/components/Text/Minor";
import { Spacing, Typography, Color } from "Homecooked/src/components/styles";
import Carousel, { Pagination } from "react-native-snap-carousel";

const imageURI = "Homecooked/src/assets/img/filledTable.jpg";

export default class Hero extends Component {
    state = {
        activeSlide: 0
    };

    _renderImage = item => {
        console.log(item);
        return (
            <Image
                resizeMode="cover"
                style={styles.image}
                source={{ uri: item.signedURL }}
            />
        );
    };

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
