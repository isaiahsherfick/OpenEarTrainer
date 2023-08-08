import React from 'react';
import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type PlaybackControlProps = PropsWithChildren<{
    TrainingMode: "Active" | "Passive",
}>

export default function PlaybackControl(props: PlaybackControlProps): JSX.Element {

    return (
        <View>
            {props.TrainingMode === "Passive" &&
                <View style={styles.playbackControlRow}>
                    <TouchableOpacity onPress={toggleAscend}>
                        <Text>toggleAscend</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleLooping}>
                        <Text>toggleLooping</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={togglePlaybackSpeed}>
                        <Text>togglePlaybackSpeed</Text>
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.playbackControlRow}>
                {props.TrainingMode === "Passive" &&
                    <TouchableOpacity onPress={togglePlay}>
                        <Text>togglePlay</Text>
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

function toggleAscend() { }
function toggleLooping() { }
function togglePlaybackSpeed() { }
function togglePlay() { }
function replay() { }
function skip() { }

const styles = StyleSheet.create({
    playbackControlRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
    }
})