import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Bio from './bio';
import Photo from './photo';
import Prompt from './prompt';

const ProfileCreationStack = createStackNavigator(
    {
        Prompt: {
            screen: Prompt
        },
        Photo: {
            screen: Photo
        },
        Bio: {
            screen: Bio
        }
    },
    {
        initialRouteName: 'Prompt',
        headerMode: 'none'
    }
);

export default ProfileCreationStack;
