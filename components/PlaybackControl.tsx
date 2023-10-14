import React, { useContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TrainingMode, ProgressionT } from "../screens/RootStackPrams";
import { SettingsContext } from "../contexts/SettingsContext";
import {
    ascendXML,
    descendXML,
    fastXML,
    pauseXML,
    playXML,
    randomXML,
    // repeatXML,
    replayXML,
    skipXML,
    slowXML,
} from "../assets/icons/svgXMLs";
import { SvgXml } from "react-native-svg";

import Sound from "react-native-sound";
Sound.setCategory("Playback");

import { SoundEngineContext } from "../hooks/useSoundEngine";

type PlaybackControlProps = PropsWithChildren<{
    TrainingMode: TrainingMode;
}>;

export default function PlaybackControl(
    props: PlaybackControlProps,
): JSX.Element {
    const { settings, setSettings } = useContext(SettingsContext);
    const { startPassive, pausePassive, replay, next } = useContext(SoundEngineContext)
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [progression, setProgression] = useState<ProgressionT>("random");
    // const [looping, setLooping] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState<"slow" | "fast">("slow");

    useEffect(() => {
        console.log('lasdasfadsffadfsdfaf', props.TrainingMode)
        setAudioPlaying(false)

    }, [settings.trainingMode])

    const toggleAscend = () => {
        const nextState: ProgressionT = progression === 'random' ? 'ascend' : (progression === 'ascend' ? 'descend' : 'random')
        setProgression(nextState)
        setSettings(prev => ({
            ...prev,
            intervals: {
                ...prev.intervals,
                progression: nextState
            }
        }))
    }
    // const toggleLooping = () => {
    //     const nextState = !looping
    //     setLooping(nextState)
    // }
    const togglePlaybackSpeed = () => {
        const nextState = playbackSpeed === 'slow' ? 'fast' : 'slow'
        setPlaybackSpeed(nextState)
        setSettings(prev => ({
            ...prev,
            playbackSpeed: nextState
        }))

    }
    const playPause = () => {
        const nextState = !audioPlaying

        if (nextState) {
            // passivePlay(settings)
            startPassive()
        }
        else {
            // passivePause()
            pausePassive()
        }

        setAudioPlaying(nextState)

    }

    return (
        <View>
            {props.TrainingMode === "passive" &&
                <View style={styles.playbackControlRow}>
                    <TouchableOpacity onPress={toggleAscend}>
                        {progression === 'ascend' ?
                            <SvgXml width={50} xml={ascendXML} />
                            : progression === 'descend' ?
                                <SvgXml width={50} xml={descendXML} />
                                :
                                <SvgXml width={50} xml={randomXML} />}
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={toggleLooping}>
                        {looping ?
                            <SvgXml width={50} xml={repeatXML} />
                            :
                            <SvgXml width={50} xml={repeatXML} />}
                    </TouchableOpacity> */}
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
                {props.TrainingMode === "passive" &&
                    <TouchableOpacity onPress={playPause}>
                        {audioPlaying ?
                            <SvgXml width={75} xml={pauseXML} />
                            :
                            <SvgXml width={75} xml={playXML} />

                        }
                    </TouchableOpacity>
                }
                {props.TrainingMode === "active" &&
                    <>
                        <TouchableOpacity onPress={replay}>
                            <SvgXml width={75} xml={replayXML} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={next}>
                            <SvgXml width={75} xml={skipXML} />
                        </TouchableOpacity>
                    </>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    playbackControlRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
    },
});
