import React from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { Spacing, Typography, Color } from 'Homecooked/src/components/styles';

const Button = props =>
    props.loading ? (
        <View style={props.style}>
            <View
                style={{
                    width: Spacing.deviceWidth - 40,
                    height: 50,
                    borderColor: props.borderColor || Color.transparent,
                    backgroundColor: props.fill || Color.transparent,
                    borderRadius: 4,
                    borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator size="small" color={Color.white} />
            </View>
        </View>
    ) : (
        <TouchableOpacity onPress={props.onPress} style={props.style}>
            <View
                style={{
                    width: Spacing.deviceWidth - 40,
                    height: 50,
                    borderColor: props.borderColor || Color.transparent,
                    backgroundColor: props.fill || Color.transparent,
                    borderRadius: 4,
                    borderWidth: 2,
                    marginBottom: 20,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        color: props.textColor || Color.white,
                        fontSize: Typography.baseFontSize,
                        fontFamily: Typography.fontFamily,
                        fontWeight: Typography.heavy
                    }}
                >
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );

export default Button;
