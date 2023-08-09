import React from 'react';
import type { PropsWithChildren } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { NotesMode, RootStackParamList } from './RootStackPrams';

type SettignsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>

type SettingsProps = PropsWithChildren<{
    NotesMode: NotesMode
}>

export default function Settings(props: SettignsScreenProps): JSX.Element {

    return (
        <View style={styles.container}>
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
                    <Text>Intervals</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.toggleSwitchCell}
                    onPress={() => { }}>
                    <Text>Chords</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.settingsHeading}>Interval Settings</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
    },
    toggleSwitchCell: {
        flexGrow: 1
    }
})