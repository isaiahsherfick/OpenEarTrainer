import React, { useContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { Button, StyleSheet, Text, View, SafeAreaView, Animated, useWindowDimensions, useAnimatedValue, Easing } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import PlaybackControl from '../components/PlaybackControl';
import { RootStackParamList } from './RootStackPrams';
import { globalStyles } from '../styles';
import { SettingsContext } from '../SettingsContext';
import { Gesture, GestureDetector, GestureStateChangeEvent, GestureUpdateEvent, PanGestureChangeEventPayload, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';

type ActiveTrainingProp = StackScreenProps<RootStackParamList, 'ActiveTraining'>

export default function ActiveTraining({ route, navigation }: ActiveTrainingProp): JSX.Element {
    const { settings, setSettings } = useContext(SettingsContext)
    const [screenLoaded, setScreenloaded] = useState(false)
    const { width } = useWindowDimensions()
    const translateX = useAnimatedValue(-width)

    // screen slides in when in focus
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            Animated.timing(translateX, {
                toValue: 0,
                duration: 200,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true
            }).start(res => {
                setScreenloaded(true)
            })
        })

        return unsubscribe
    }, [navigation])

    // swipe from right side to navigate to passive training
    const gesture = Gesture.Pan()
        .onChange(e => {
            // console.log('abs x', e.absoluteX, 'dx', e.changeX, 'transl x', e.translationX)
            // update screens x offset
            if (isLeftSwipe(e)) {
                translateX.setValue(e.translationX)
            }
        })
        .onEnd(e => {
            if (isLeftSwipe(e)) {
                Animated.timing(translateX, {
                    toValue: -width,
                    duration: 200,
                    easing: Easing.quad,
                    useNativeDriver: true
                }).start(res => {
                    toPassive()
                })
            }
        })

    const isLeftSwipe = (e: GestureStateChangeEvent<PanGestureHandlerEventPayload> | GestureUpdateEvent<PanGestureHandlerEventPayload & PanGestureChangeEventPayload>) =>
        e.translationX < 0 && // swipe left
        Math.abs(e.translationX) > Math.abs(2 * e.translationY) // horizontal swipe (dx > 2*dy)

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
                <Animated.View style={[
                    styles.TrainingScreen,
                    { transform: [{ translateX: translateX }] }
                ]}>
                    <ScreenHeader
                        TrainingMode='Active'
                        NotesMode={settings.notesMode}
                        Navigation={navigation}
                    />
                    <ActiveTrainingBody />
                    <PlaybackControl
                        TrainingMode='Active'
                    />
                </Animated.View>
            </GestureDetector>
            {/* <Button
                title='to passive'
                onPress={toPassive}
            /> */}
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
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})