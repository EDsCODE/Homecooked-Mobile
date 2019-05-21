import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export default props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={props.style}>
            <View style={styles.floatyButton}>
                <Icon
                    name="ios-arrow-round-forward"
                    type="ionicon"
                    color="white"
                    size={50}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    floatyButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: "#FF674F",
        justifyContent: "center",
        alignItems: "center"
    }
});
