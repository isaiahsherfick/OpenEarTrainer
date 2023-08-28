import React, { useContext, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import ScreenHeader from '../components/ScreenHeader';
import PlaybackControl from '../components/PlaybackControl';
import { RootStackParamList } from './RootStackPrams';
import { globalStyles } from '../styles';
import { SettingsContext } from '../SettingsContext';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

type PassiveTrainingProp = StackScreenProps<RootStackParamList, 'PassiveTraining'>

export default function PassiveTraining({ route, navigation }: PassiveTrainingProp): JSX.Element {
    const { settings, setSettings } = useContext(SettingsContext)

    // swipe from left side to navigate to active training
    const gesture = Gesture.Pan()
        .onChange((e) => {
            // TODO update screens x offset
        })
        .onEnd((e) => {
            if (e.translationX > 0 && // swipe right
                Math.abs(e.translationX) > Math.abs(2 * e.translationY) // horizontal swipe (dx > 2*dy)
            ) {
                console.log('right swipe')
                toActive()
            }
        })

    const toActive = () => {

        // TODO halt audio playback

        setSettings({
            ...settings,
            trainingMode: 'Active'
        })

        navigation.navigate('ActiveTraining')
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <GestureDetector gesture={gesture}>
                <View style={styles.TrainingScreen}>
                    <ScreenHeader
                        TrainingMode='Passive'
                        NotesMode={settings.notesMode}
                        Navigation={navigation}
                    />
                    <PassiveTrainingBody />
                    <PlaybackControl
                        TrainingMode='Passive'
                    />
                </View>
            </GestureDetector>
            <Button
                title='to active'
                onPress={toActive}
            />
        </SafeAreaView>
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
        height: '95%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})