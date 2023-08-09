import React from 'react';
import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActiveTrainingProp, NotesMode, PassiveTrainingProp, SettignsScreenProps, TrainingMode } from '../screens/RootStackPrams';

type HeaderProps = PropsWithChildren<{
    TrainingMode: TrainingMode,
    NotesMode: NotesMode,
    Navigation: ActiveTrainingProp['navigation'] | PassiveTrainingProp['navigation'] | SettignsScreenProps['navigation']
}>

export default function ScreenHeader(props: HeaderProps): JSX.Element {

    return (
        <View style={styles.headerContainer}>
            <View>
                <Text style={styles.notesMode}>
                    {props.NotesMode}
                </Text>
                <Text style={styles.trainingMode}>
                    {props.TrainingMode} Training
                </Text>
            </View>
            <TouchableOpacity onPress={() => { props.Navigation.push('Settings') }}>
                <Text>settigns</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    notesMode: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black'
    },
    trainingMode: {
        fontSize: 20
    }
})