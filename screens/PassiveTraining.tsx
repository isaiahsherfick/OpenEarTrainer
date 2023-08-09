import React from 'react';
import type { PropsWithChildren } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
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
            <View style={styles.TrainingScreen}>
                <ScreenHeader
                    TrainingMode='Passive'
                    NotesMode='Chords' // TODO make dynamic based on setting
                    Navigation={navigation}
                />
                <PassiveTrainingBody />
                <PlaybackControl
                    TrainingMode='Passive'
                />
            </View>
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

const styles = StyleSheet.create({
    TrainingScreen: {
        height: '90%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})