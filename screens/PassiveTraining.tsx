import React from 'react';
import type { PropsWithChildren } from 'react';
import { Text, View, Button } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import ScreenHeader from '../components/ScreenHeader';
import PlaybackControl from '../components/PlaybackControl';
import { RootStackParamList } from './RootStackPrams';

type PassiveTrainingProp = StackScreenProps<RootStackParamList, 'PassiveTraining'>

export default function PassiveTraining({ route, navigation }: PassiveTrainingProp): JSX.Element {

    return (
        <View>
            <Button
                title='to active'
                onPress={() => navigation.navigate('ActiveTraining')}
            />
            <ScreenHeader
                TrainingMode='Passive'
                NotesMode='Chords' // TODO make dynamic based on setting
            />
            <PassiveTrainingBody />
            <PlaybackControl
                TrainingMode='Passive'
            />
        </View>
    )
}

function PassiveTrainingBody(props: PropsWithChildren): JSX.Element {

    return (
        <View>
            <Text>
                I'm the body of the Passive Training View
            </Text>
        </View>
    )
}