import React from 'react';
import type { PropsWithChildren } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type HeaderProps = PropsWithChildren<{
    TrainingMode: "Active" | "Passive",
    NotesMode: "Intervals" | "Chords"
}>

export default function ScreenHeader(props: HeaderProps): JSX.Element {

    return (
        <View>
            <View>
                <Text>
                    {props.NotesMode}
                </Text>
                <Text>
                    {props.TrainingMode} Training
                </Text>
            </View>
            <TouchableOpacity onPress={() => { }}>
                <Text>settigns</Text>
            </TouchableOpacity>
        </View>
    )
}