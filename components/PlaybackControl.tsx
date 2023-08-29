import React, { useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TrainingMode } from '../screens/RootStackPrams';
import { SettingsContext } from '../SettingsContext';

type PlaybackControlProps = PropsWithChildren<{
    TrainingMode: TrainingMode,
}>

export default function PlaybackControl(props: PlaybackControlProps): JSX.Element {
    const { settings, setSettings } = useContext(SettingsContext)
    const [audioPlaying, setAudioPlaying] = useState(false)
    const [progression, setProgression] = useState<'ascend' | 'descend' | 'random'>('random')
    const [looping, setLooping] = useState(false)
    const [playbackSpeed, setPlaybackSpeed] = useState<'slow' | 'fast'>('slow')

    const toggleAscend = () => {
        const newProgression: 'ascend' | 'descend' | 'random' = progression === 'random' ? 'ascend' : (progression === 'ascend' ? 'descend' : 'random')
        setProgression(newProgression)

    }
    const toggleLooping = () => {
        const newLooping = !looping
        setLooping(newLooping)

    }
    const togglePlaybackSpeed = () => {
        const newPlaybackSpeed = playbackSpeed === 'slow' ? 'fast' : 'slow'
        setPlaybackSpeed(newPlaybackSpeed)

    }
    const togglePlay = () => {
        const newAudioPlaying = !audioPlaying
        setAudioPlaying(newAudioPlaying)

        // TODO music engine -  play audio
    }
    const replay = () => {
        // TODO music engine -  replay
    }
    const skip = () => {
        // TODO music engine -  next audio
    }

    return (
        <View>
            {props.TrainingMode === "Passive" &&
                <View style={styles.playbackControlRow}>
                    <TouchableOpacity onPress={toggleAscend}>
                        <Text>toggleAscend</Text>
                        <Text>{progression}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleLooping}>
                        <Text>toggleLooping</Text>
                        <Text>{looping ? 'looping' : 'not looping'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={togglePlaybackSpeed}>
                        <Text>togglePlaybackSpeed</Text>
                        <Text>{playbackSpeed}</Text>
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.playbackControlRow}>
                {props.TrainingMode === "Passive" &&
                    <TouchableOpacity onPress={togglePlay}>
                        <Text>togglePlay</Text>
                        <Text>{audioPlaying ? 'playing' : 'paused'}</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={replay}>
                    <Text>replay</Text>
                </TouchableOpacity>
                {props.TrainingMode === "Active" &&
                    <TouchableOpacity onPress={skip}>
                        <Text>skip</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    playbackControlRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
    }
})