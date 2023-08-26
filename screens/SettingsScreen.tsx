import React, { useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { NotesMode, RootStackParamList } from './RootStackPrams';
import { Intervals } from '../music_theory/Interval';
import SettingsData from '../Settings';
import { globalStyles } from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsContext } from '../SettingsContext';

type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>


export default function SettingsScreen(props: SettingsScreenProps): JSX.Element {
    const { settings, setSettings } = useContext(SettingsContext)
    const [notesMode, setNotesMode] = useState<NotesMode>(settings.notesMode)

    const toggleNotesMode = (mode: NotesMode) => {
        if (mode != notesMode) {
            setNotesMode(mode)

            // TODO sync to global settings obj
            setSettings({
                ...settings,
                notesMode: mode
            })
        }
    }

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
                        style={[styles.toggleSwitchCell, notesMode == 'Chords' && styles.selectedCell]}
                        onPress={() => { toggleNotesMode('Chords') }}
                    >
                        <Text style={[styles.cellText, notesMode == 'Chords' && styles.selectedCellText]}>Chords</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleSwitchCell, notesMode == 'Intervals' && styles.selectedCell]}
                        onPress={() => { toggleNotesMode('Intervals') }}>
                        <Text style={[styles.cellText, notesMode == 'Intervals' && styles.selectedCellText]}>Intervals</Text>
                    </TouchableOpacity>
                </View>
                <IntervalsOptions />
                <ChordsOptions />
            </ScrollView>
        </SafeAreaView>
    )
}

function IntervalsOptions(): JSX.Element {
    const { settings, setSettings } = useContext(SettingsContext)
    const [selectedIntervals, setSelectedIntervals] = useState<string[]>(Object.keys(settings.intervals.intervalsToQuiz)) // TODO fetch inital selected from gobal obj

    const intervals: string[] = [];
    Object.keys(Intervals).forEach((k, i) => {
        intervals.push(k);
    })

    const toggleIntervalOption = (interval: string) => {
        let newIntervals = [];
        if (selectedIntervals.includes(interval)) {
            newIntervals = selectedIntervals.filter(i => i !== interval);
        }
        else {
            newIntervals = [...selectedIntervals, interval];
        }
        console.log(newIntervals);
        setSelectedIntervals(newIntervals);

        // sync to global settings obj
        setSettings({
            ...settings,
            intervals: {
                ...settings.intervals,
                intervalsToQuiz: newIntervals
            }
        })
    }

    return (
        <View>
            <Text style={styles.settingsHeading}>Interval Settings</Text>
            <View style={styles.optionsContainer}>
                {intervals.map((interval, i) =>
                    <TouchableOpacity
                        key={interval}
                        style={[styles.optionCell, selectedIntervals.includes(interval) && styles.selectedCell]}
                        onPress={() => { toggleIntervalOption(interval) }}>
                        <Text style={[styles.cellText, selectedIntervals.includes(interval) && styles.selectedCellText]}>{interval}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

function ChordsOptions(): JSX.Element {
    const { settings, setSettings } = useContext(SettingsContext)
    const [selectedChords, setSelectedChords] = useState<string[]>(Object.keys(settings.chords.chordsToQuiz))  // TODO fetch inital selected from gobal obj

    const chords: string[] = [];
    Object.keys(SettingsData.chords.chordsToQuiz).forEach((k, i) => {
        chords.push(k)
    })

    const toggleChordOption = (chord: string) => {
        let newChords = [];
        if (selectedChords.includes(chord)) {
            newChords = selectedChords.filter(i => i !== chord);
        }
        else {
            newChords = [...selectedChords, chord];
        }
        console.log(newChords);
        setSelectedChords(newChords);


        // sync to global settings obj
        setSettings({
            ...settings,
            chords: {
                ...settings.chords,
                chordsToQuiz: newChords
            }
        })
    }

    return (
        <View>
            <Text style={styles.settingsHeading}>Chords Settings</Text>
            <View style={styles.optionsContainer}>
                {chords.map((chord, i) =>
                    <TouchableOpacity key={chord} style={[styles.optionCell, selectedChords.includes(chord) && styles.selectedCell]} onPress={() => { toggleChordOption(chord) }}>
                        <Text style={[styles.cellText, selectedChords.includes(chord) && styles.selectedCellText]}>{chord}</Text>
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
    selectedCell: {
        backgroundColor: 'slategray',
    },
    selectedCellText: {
        color: 'white'
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