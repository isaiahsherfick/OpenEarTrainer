import React from 'react';
import type { PropsWithChildren } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { NotesMode, RootStackParamList } from './RootStackPrams';
import { Intervals } from '../music_theory/Interval';
import SettingsData from '../Settings';
import { globalStyles } from '../styles';

type SettignsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>

type SettingsProps = PropsWithChildren<{
    NotesMode: NotesMode
}>

export default function SettingsScreen(props: SettignsScreenProps): JSX.Element {

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView>
                <View style={styles.settingsHeader}>
                    <Button
                        title='Back'
                        onPress={() => { props.navigation.pop() }}
                    />
                    <Text style={styles.settingsTitle}>
                        Settings
                    </Text>
                </View>
                <View>
                    <Text style={styles.settingsHeading}>Training Mode</Text>
                </View>
                <View style={styles.toggleSwitch}>
                    <TouchableOpacity
                        style={styles.toggleSwitchCell}
                        onPress={() => { }}
                    >
                        <Text style={styles.cellText}>Intervals</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toggleSwitchCell}
                        onPress={() => { }}>
                        <Text style={styles.cellText}>Chords</Text>
                    </TouchableOpacity>
                </View>
                <IntervalsOptions />
                <ChordsOptions />
            </ScrollView>
        </SafeAreaView>
    )
}

function IntervalsOptions(): JSX.Element {
    const intervals: String[] = []
    Object.keys(Intervals).forEach((k, i) => {
        intervals.push(k)
    })
    return (
        <View>
            <Text style={styles.settingsHeading}>Interval Settings</Text>
            <View style={styles.optionsContainer}>
                {intervals.map((e, i) =>
                    <TouchableOpacity style={styles.optionCell}>
                        <Text key={i} style={styles.cellText}>{e}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

function ChordsOptions(): JSX.Element {
    const chords: string[] = []
    Object.keys(SettingsData.chords.chordsToQuiz).forEach((k, i) => {
        chords.push(k)
    })
    return (
        <View>
            <Text style={styles.settingsHeading}>Chords Settings</Text>
            <View style={styles.optionsContainer}>
                {chords.map((e, i) =>
                    <TouchableOpacity style={styles.optionCell}>
                        <Text key={e} style={styles.cellText}>{e}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    settingsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    settingsTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 32
    },
    settingsHeading: {
        color: 'black',
        fontSize: 20
    },
    toggleSwitch: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 10
    },
    toggleSwitchCell: {
        flexGrow: 1,
        // backgroundColor: 'cyan',
        borderBlockColor: '#aaaaaa',
        borderColor: '#aaaaaa',
        borderWidth: 1,
        paddingVertical: 10
    },
    cellText: {
        fontSize: 20,
        textAlign: 'center'
    },
    selected: {
        backgroundColor: 'pink'
    },
    optionsContainer: {
        paddingVertical: 10,
        flex: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // gap: 5
    },
    optionCell: {
        width: '45%',
        flexGrow: 1,
        padding: 15,
        borderWidth: 1,
        borderColor: '#aaaaaa',

    }
})