import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Info from './info';
import Voting from './voting';
import Review from './review';

const RatingStack = createStackNavigator(
    {
        Info: {
            screen: Info
        },
        Voting: {
            screen: Voting
        },
        Review: {
            screen: Review
        }
    },
    {
        initialRouteName: 'Voting',
        headerMode: 'none'
    }
);

export default RatingStack;
