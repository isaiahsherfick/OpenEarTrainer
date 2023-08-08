import React from 'react';
import type { PropsWithChildren } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import PlaybackControl from '../components/PlaybackControl';
import { RootStackParamList } from './RootStackPrams';

type ActiveTrainingProp = StackScreenProps<RootStackParamList, 'ActiveTraining'>

export default function ActiveTraining({ route, navigation }: ActiveTrainingProp): JSX.Element {
    return (
        <View>
            <Button
                title='to passive'
                onPress={() => navigation.navigate('PassiveTraining')}
            />
            <ScreenHeader
                TrainingMode='Active'
                NotesMode='Chords' // TODO make dynamic based on setting
            />
            <ActiveTrainingBody />
            <PlaybackControl
                TrainingMode='Active'
            />
        </View>
    )
}

function ActiveTrainingBody(props: PropsWithChildren): JSX.Element {

    return (
        <View>
            <Text>
                I'm the body of the Active Training View
            </Text>
        </View>
    )
}