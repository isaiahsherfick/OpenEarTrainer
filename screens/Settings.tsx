import React from 'react';
import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

type SettingsProps = PropsWithChildren<{
    NotesMode: "Intervals" | "Chords"
}>

export default function Settings(props: SettingsProps): JSX.Element {

    return (
        <View>

        </View>
    )
}