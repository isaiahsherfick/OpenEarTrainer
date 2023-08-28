import React, { useContext, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import PlaybackControl from '../components/PlaybackControl';
import { RootStackParamList } from './RootStackPrams';
import { globalStyles } from '../styles';
import { SettingsContext } from '../SettingsContext';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type ActiveTrainingProp = StackScreenProps<RootStackParamList, 'ActiveTraining'>

export default function ActiveTraining({ route, navigation }: ActiveTrainingProp): JSX.Element {
    const { settings, setSettings } = useContext(SettingsContext)

    // swipe from right side to navigate to passive training
    const gesture = Gesture.Pan()
        // .onBegin((e) => {
        //     console.log('onBegin', e)
        // })
        .onChange((e) => {
            // console.log('onChange', e)

            // TODO update screens x offset
        })
        .onEnd((e) => {
            // console.log('onEnd', e)

            if (e.translationX < 0 && // swipe left
                Math.abs(e.translationX) > Math.abs(2 * e.translationY) // horizontal swipe (dx > 2*dy)
            ) {
                console.log('left swipe')
                toPassive()
            }
        })
    // .onFinalize((e) => {
    //     console.log('onFinalize', e)
    // })

    const toPassive = () => {

        // TODO halt audio playback

        setSettings({
            ...settings,
            trainingMode: 'Passive'
        })

        navigation.navigate('PassiveTraining')
    }


    return (
        <SafeAreaView style={globalStyles.container}>
            <GestureDetector gesture={gesture}>
                <View style={styles.TrainingScreen}>
                    <ScreenHeader
                        TrainingMode='Active'
                        NotesMode={settings.notesMode}
                        Navigation={navigation}
                    />
                    <ActiveTrainingBody />
                    <PlaybackControl
                        TrainingMode='Active'
                    />
                </View>
            </GestureDetector>
            <Button
                title='to passive'
                onPress={toPassive}
            />
        </SafeAreaView>
    )
}

function ActiveTrainingBody(props: PropsWithChildren): JSX.Element {

    return (
        <View>
            <Text>
                I'm the body of the Active Training View
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