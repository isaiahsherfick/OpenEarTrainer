import React from 'react';
import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type HeaderProps = PropsWithChildren<{
    TrainingMode: "Active" | "Passive",
    NotesMode: "Intervals" | "Chords"
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
            <TouchableOpacity onPress={() => { }}>
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