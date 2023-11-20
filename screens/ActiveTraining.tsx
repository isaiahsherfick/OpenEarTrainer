import React, { useContext, useEffect, useState } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, SafeAreaView, Animated, useWindowDimensions, useAnimatedValue, Easing } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import PlaybackControl from '../components/PlaybackControl';
import { RootStackParamList } from './RootStackPrams';
import { globalStyles } from '../styles';
import { SettingsContext } from '../contexts/SettingsContext';
import { Gesture, GestureDetector, GestureStateChangeEvent, GestureUpdateEvent, PanGestureChangeEventPayload, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { ActiveTrainingBody } from '../components/ActiveTrainingBody';
import { SvgXml } from 'react-native-svg';
import { leftScreenDots } from '../assets/icons/svgXMLs';
import { SoundEngineContext } from '../contexts/SoundEngineContext';

type ActiveTrainingProp = StackScreenProps<RootStackParamList, 'ActiveTraining'>

export default function ActiveTraining({ route, navigation }: ActiveTrainingProp): JSX.Element {
    const { settings, setSettings } = useContext(SettingsContext)
    const { currentChordOrIntervalRef } = useContext(SoundEngineContext)
    const [screenLoaded, setScreenloaded] = useState(false)
    const { width } = useWindowDimensions()
    const translateX = useAnimatedValue(-width)
    const [trainingInfo, setTrainingInfo] = useState({})

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
            translateX.setValue(e.translationX)
        })
        .onEnd(e => {
            if (isLeftSwipe(e)) {
                Animated.timing(translateX, {
                    toValue: -width,
                    duration: 100,
                    easing: Easing.quad,
                    useNativeDriver: true
                }).start(res => {
                    toPassive()
                })
            }
            else {
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 100,
                    easing: Easing.quad,
                    useNativeDriver: true
                }).start()
            }
        })

    const isLeftSwipe = (e: GestureStateChangeEvent<PanGestureHandlerEventPayload> | GestureUpdateEvent<PanGestureHandlerEventPayload & PanGestureChangeEventPayload>) =>
        e.translationX < 0 && // swipe left
        Math.abs(e.translationX) > Math.abs(2 * e.translationY) // horizontal swipe (dx > 2*dy)

    const toPassive = () => {

        // TODO halt audio playback

        setSettings({
            ...settings,
            trainingMode: 'passive'
        })

        navigation.navigate('PassiveTraining')
    }

    const onNextIntervalOrChord = () => {
        if (currentChordOrIntervalRef?.current) {
            setTrainingInfo(currentChordOrIntervalRef.current)
        }
    }


    return (
        <SafeAreaView style={globalStyles.container}>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[
                    styles.TrainingScreen,
                    { transform: [{ translateX: translateX }] }
                ]}>
                    <ScreenHeader
                        TrainingMode='active'
                        NotesMode={settings.notesMode}
                        Navigation={navigation}
                    />
                    <ActiveTrainingBody
                        trainingInfo={trainingInfo}
                    />
                    <PlaybackControl
                        trainingMode='active'
                        parentActionOnNextIntervalOrChord={onNextIntervalOrChord}
                    />
                </Animated.View>
            </GestureDetector>

            <View style={styles.screenDotsContainer}>
                <SvgXml xml={leftScreenDots} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TrainingScreen: {
        height: '95%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    screenDotsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
    }
})