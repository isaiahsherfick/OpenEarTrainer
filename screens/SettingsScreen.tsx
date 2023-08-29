import React, { useContext, useState } from 'react';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { NotesMode, RootStackParamList } from './RootStackPrams';
import { Interval, Intervals } from '../music_theory/Interval';
import { globalStyles } from '../styles';
import { SettingsContext } from '../SettingsContext';
import { Chords } from '../music_theory/Chord';

type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>


export default function SettingsScreen(props: SettingsScreenProps): JSX.Element {
    const { settings, setSettings } = useContext(SettingsContext)
    const [notesMode, setNotesMode] = useState<NotesMode>(settings.notesMode)
    const [selectedIntervals, setSelectedIntervals] = useState(settings.intervals.intervalsToQuiz)
    const [selectedChords, setSelectedChords] = useState(settings.chords.chordsToQuiz)

    const toggleNotesMode = (mode: NotesMode) => {
        if (mode != notesMode) {
            setNotesMode(mode)
        }
    }

    const backToTraining = () => {
        const updatedSettings = {
            ...settings,
            notesMode: notesMode,
            intervals: {
                ...settings.intervals,
                intervalsToQuiz: selectedIntervals
            },
            chords: {
                ...settings.chords,
                chordsToQuiz: selectedChords
            }
        }
        setSettings(updatedSettings)

        props.navigation.pop()
    }

    return (
        <ScrollView style={globalStyles.container}>
            <SafeAreaView>
                <View style={styles.settingsHeader}>
                    <Button
                        title='Back'
                        onPress={backToTraining}
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
                {notesMode === 'Intervals' ?
                    <IntervalsOptions selectedIntervals={selectedIntervals} setSelectedIntervals={setSelectedIntervals} />
                    :
                    <ChordsOptions selectedChords={selectedChords} setSelectedChords={setSelectedChords} />
                }

            </SafeAreaView>
        </ScrollView>
    )
}

function IntervalsOptions(
    { selectedIntervals, setSelectedIntervals }: { selectedIntervals: number[], setSelectedIntervals: Dispatch<SetStateAction<number[]>> }
): JSX.Element {

    const toggleIntervalOption = (interval: number) => {
        let newIntervals = [];
        if (selectedIntervals.includes(interval)) {
            newIntervals = selectedIntervals.filter(i => i !== interval);
        }
        else {
            newIntervals = [...selectedIntervals, interval];
        }
        setSelectedIntervals(newIntervals);
    }

    return (
        <View>
            <Text style={styles.settingsHeading}>Interval Settings</Text>
            <View style={styles.optionsContainer}>
                {Object.keys(Intervals).map((interval, i) =>
                    <TouchableOpacity
                        key={interval}
                        style={[
                            styles.optionCell,
                            selectedIntervals.includes(Intervals[interval as keyof typeof Intervals]) && styles.selectedCell
                        ]}
                        onPress={() => { toggleIntervalOption(Intervals[interval as keyof typeof Intervals]) }}
                    >
                        <Text
                            style={[
                                styles.cellText,
                                selectedIntervals.includes(Intervals[interval as keyof typeof Intervals]) && styles.selectedCellText
                            ]}
                        >
                            {interval}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

function ChordsOptions(
    { selectedChords, setSelectedChords }: { selectedChords: number[], setSelectedChords: Dispatch<SetStateAction<number[]>> }
): JSX.Element {

    const toggleChordOption = (chord: number) => {
        let newChords = [];
        if (selectedChords.includes(chord)) {
            newChords = selectedChords.filter(i => i !== chord);
        }
        else {
            newChords = [...selectedChords, chord];
        }
        setSelectedChords(newChords);
    }

    return (
        <View>
            <Text style={styles.settingsHeading}>Chords Settings</Text>
            <View style={styles.optionsContainer}>
                {Object.keys(Chords).map((chord, i) =>
                    <TouchableOpacity
                        key={chord}
                        style={[
                            styles.optionCell,
                            selectedChords.includes(Chords[chord as keyof typeof Chords]) && styles.selectedCell]}
                        onPress={() => {
                            toggleChordOption(Chords[chord as keyof typeof Chords
                            ])
                        }}>
                        <Text
                            style={[
                                styles.cellText,
                                selectedChords.includes(Chords[chord as keyof typeof Chords]) && styles.selectedCellText
                            ]}
                        >
                            {chord}
                        </Text>
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
        paddingBottom: 10
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
        borderBlockColor: '#aaaaaa',
        borderColor: '#aaaaaa',
        borderWidth: .3,
        paddingVertical: 10
    },
    cellText: {
        fontSize: 20,
        textAlign: 'center'
    },
    selectedCell: {
        backgroundColor: '#333333',
        borderColor: '#ffffffaa',
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
        borderWidth: .3,
        borderColor: '#aaaaaa',

    }
})