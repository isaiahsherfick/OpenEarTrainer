import React, { useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TrainingMode } from '../screens/RootStackPrams';
import { SettingsContext } from '../SettingsContext';
import { playXML, pauseXML, replayXML, skipXML, fastXML, slowXML, repeatXML, randomXML, descendXML, ascendXML } from '../assets/icons/svgXMLs'
import { SvgXml } from 'react-native-svg';

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
                        {progression === 'ascend' ?
                            <SvgXml width={50} xml={ascendXML} />
                            : progression === 'descend' ?
                                <SvgXml width={50} xml={descendXML} />
                                :
                                <SvgXml width={50} xml={randomXML} />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleLooping}>
                        {looping ?
                            <SvgXml width={50} xml={repeatXML} />
                            :
                            <SvgXml width={50} xml={repeatXML} />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={togglePlaybackSpeed}>
                        {playbackSpeed === 'slow' ?
                            <SvgXml width={50} xml={slowXML} />
                            :
                            <SvgXml width={50} xml={fastXML} />
                        }
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.playbackControlRow}>
                {props.TrainingMode === "Passive" &&
                    <TouchableOpacity onPress={togglePlay}>
                        {audioPlaying ?
                            <SvgXml width={75} xml={pauseXML} />
                            :
                            <SvgXml width={75} xml={playXML} />

                        }
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={replay}>
                    <SvgXml width={75} xml={replayXML} />
                </TouchableOpacity>
                {props.TrainingMode === "Active" &&
                    <TouchableOpacity onPress={skip}>
                        <SvgXml width={75} xml={skipXML} />
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