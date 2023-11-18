import React, { useContext, useEffect, useRef, useState } from "react";
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

import { SoundEngineContext } from "../contexts/SoundEngineContext";

type PlaybackControlProps = PropsWithChildren<{
    TrainingMode: TrainingMode;
}>;

export default function PlaybackControl(
    props: PlaybackControlProps,
): JSX.Element {
    const { settings, setSettings } = useContext(SettingsContext);
    const { playPassive, pausePassive, replay, playNext } = useContext(SoundEngineContext)
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [progression, setProgression] = useState<ProgressionT>("simultaneous");
    const [playbackSpeed, setPlaybackSpeed] = useState<"slow" | "fast">("slow");
    const stopPassiveRef = useRef<() => void>()

    useEffect(() => {
        if (settings.intervals.progression) {
            setProgression(settings.intervals.progression)
        }
        if (settings.playbackSpeed) {
            setPlaybackSpeed(settings.playbackSpeed)
        }
    }, [settings])

    useEffect(() => {
        pausePassive()
        setAudioPlaying(false)
    }, [settings.trainingMode])

    const toggleAscend = () => {
        const nextState: ProgressionT = progression === 'simultaneous' ? 'ascend' : (progression === 'ascend' ? 'descend' : 'simultaneous')
        setProgression(nextState)
        setSettings(prev => ({
            ...prev,
            intervals: {
                ...prev.intervals,
                progression: nextState
            }
        }))
    }
    const togglePlaybackSpeed = () => {
        const nextState = playbackSpeed === 'slow' ? 'fast' : 'slow'
        setPlaybackSpeed(nextState)
        console.log('PC - speed changed')
        setSettings(prev => ({
            ...prev,
            playbackSpeed: nextState
        }))

    }
    const playPause = () => {
        const nextState = !audioPlaying

        console.log('settings.intervals.intervalsToQuiz', settings.intervals.intervalsToQuiz)

        if (nextState) {
            playPassive()
            // stopPassiveRef.current = passive()
        }
        else {
            pausePassive()
            // if (stopPassiveRef.current) stopPassiveRef.current()
        }

        setAudioPlaying(nextState)

    }

    return (
        <View>
            {props.TrainingMode === "passive" &&
                <View style={styles.playbackControlRow}>
                    <TouchableOpacity onPress={toggleAscend}>
                        {progression === 'ascend' ?
                            <SvgXml width={32} xml={ascendXML} />
                            : progression === 'descend' ?
                                <SvgXml width={32} xml={descendXML} />
                                :
                                <SvgXml width={32} xml={randomXML} />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={togglePlaybackSpeed}>
                        {settings.playbackSpeed === 'slow' ?
                            <SvgXml width={32} xml={slowXML} />
                            :
                            <SvgXml width={32} xml={fastXML} />
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
                        <TouchableOpacity onPress={playNext}>
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
        paddingVertical: 5,
    },
});
