import React, { useContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, Animated, useWindowDimensions, useAnimatedValue, Easing } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import ScreenHeader from '../components/ScreenHeader';
import PlaybackControl from '../components/PlaybackControl';
import { RootStackParamList } from './RootStackPrams';
import { globalStyles } from '../styles';
import { SettingsContext } from '../SettingsContext';
import { GestureDetector, Gesture, GestureStateChangeEvent, PanGestureHandlerEventPayload, PanGestureChangeEventPayload, GestureUpdateEvent } from 'react-native-gesture-handler';

type PassiveTrainingProp = StackScreenProps<RootStackParamList, 'PassiveTraining'>

export default function PassiveTraining({ route, navigation }: PassiveTrainingProp): JSX.Element {
    const { settings, setSettings } = useContext(SettingsContext)
    const [screenLoaded, setScreenloaded] = useState(false)
    const { width } = useWindowDimensions()
    const translateX = useAnimatedValue(width) // screen sliding animation

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

    // swipe from left side to navigate to active training
    const gesture = Gesture.Pan()
        .onChange(e => {
            // update screens x offset
            if (isRightSwipe(e)) {
                translateX.setValue(e.translationX)
            }
        })
        .onEnd(e => {
            if (isRightSwipe(e)) {
                Animated.timing(translateX, {
                    toValue: width,
                    duration: 100,
                    easing: Easing.quad,
                    useNativeDriver: true
                }).start(res => {
                    toActive()
                })
            }
        })

    const isRightSwipe = (e: GestureStateChangeEvent<PanGestureHandlerEventPayload> | GestureUpdateEvent<PanGestureHandlerEventPayload & PanGestureChangeEventPayload>) =>
        e.translationX > 0 && // swipe right
        Math.abs(e.translationX) > Math.abs(2 * e.translationY) // horizontal swipe (dx > 2*dy)

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
                <Animated.View style={[
                    styles.TrainingScreen,
                    { transform: [{ translateX: translateX }] }
                ]}>
                    <ScreenHeader
                        TrainingMode='Passive'
                        NotesMode={settings.notesMode}
                        Navigation={navigation}
                    />
                    <PassiveTrainingBody />
                    <PlaybackControl
                        TrainingMode='Passive'
                    />
                </Animated.View>
            </GestureDetector>
            {/* <Button
                title='to active'
                onPress={toActive}
            /> */}
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
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})