import React, { useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TrainingMode } from "../screens/RootStackPrams";
import { SettingsContext } from "../SettingsContext";
import {
  ascendXML,
  descendXML,
  fastXML,
  pauseXML,
  playXML,
  randomXML,
  repeatXML,
  replayXML,
  skipXML,
  slowXML,
} from "../assets/icons/svgXMLs";
import { SvgXml } from "react-native-svg";
import { getRandomRootPositionTriad } from "../music_theory/TrainingEngine";
import { Chord } from "../music_theory/Chord";

import Sound from "react-native-sound";
Sound.setCategory("Playback");

type PlaybackControlProps = PropsWithChildren<{
  TrainingMode: TrainingMode;
}>;

export default function PlaybackControl(
  props: PlaybackControlProps,
): JSX.Element {
  const { settings, setSettings } = useContext(SettingsContext);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [progression, setProgression] = useState<
    "ascend" | "descend" | "random"
  >("random");
  const [looping, setLooping] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<"slow" | "fast">("slow");

  const toggleAscend = () => {
    const newProgression: "ascend" | "descend" | "random" =
      progression === "random"
        ? "ascend"
        : (progression === "ascend" ? "descend" : "random");
    setProgression(newProgression);
  };
  const toggleLooping = () => {
    const newLooping = !looping;
    setLooping(newLooping);
  };
  const togglePlaybackSpeed = () => {
    const newPlaybackSpeed = playbackSpeed === "slow" ? "fast" : "slow";
    setPlaybackSpeed(newPlaybackSpeed);
  };
  const togglePlay = () => {
    const newAudioPlaying = !audioPlaying;
    setAudioPlaying(newAudioPlaying);

    // TODO music engine -  play audio
  };
  const replay = () => {
    // TODO
    //this is just a quick test to make sure sound works
    const soundFile: string = getRandomRootPositionTriad().notes[0].getSoundFileName();
    const sound = new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {
      if (error) console.log(error);
    });
    sound.play((success) => {
      if (!success) {
        console.log(
          "sound did not play corectly due to audio decoding errors or something",
        );
      }
    });
    sound.release();
  };
  //   const sounds: Sound[] = [];
  //   for (let soundFile of chosenChord.getSoundFileNames()) {
  //     sounds.push(
  //       new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {
  //         console.log(error);
  //       }),
  //     );
  //   }
  //   for (let sound of sounds) {
  //     console.log(sound);
  //     sound.play((success) => {
  //       if (!success) {
  //         console.log(
  //           "sound did not play corectly due to audio decoding errors or something",
  //         );
  //       }
  //     });
  //   }
  //   for (let sound of sounds) {
  //     sound.release();
  //   }
  // };
  const skip = () => {
    // TODO music engine -  next audio
  };

  return (
    <View>
      {props.TrainingMode === "Passive" &&
        (
          <View style={styles.playbackControlRow}>
            <TouchableOpacity onPress={toggleAscend}>
              {progression === "ascend"
                ? <SvgXml width={50} xml={ascendXML} />
                : progression === "descend"
                ? <SvgXml width={50} xml={descendXML} />
                : <SvgXml width={50} xml={randomXML} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleLooping}>
              {looping
                ? <SvgXml width={50} xml={repeatXML} />
                : <SvgXml width={50} xml={repeatXML} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlaybackSpeed}>
              {playbackSpeed === "slow"
                ? <SvgXml width={50} xml={slowXML} />
                : <SvgXml width={50} xml={fastXML} />}
            </TouchableOpacity>
          </View>
        )}
      <View style={styles.playbackControlRow}>
        {props.TrainingMode === "Passive" &&
          (
            <TouchableOpacity onPress={togglePlay}>
              {audioPlaying
                ? <SvgXml width={75} xml={pauseXML} />
                : <SvgXml width={75} xml={playXML} />}
            </TouchableOpacity>
          )}
        <TouchableOpacity onPress={replay}>
          <SvgXml width={75} xml={replayXML} />
        </TouchableOpacity>
        {props.TrainingMode === "Active" &&
          (
            <TouchableOpacity onPress={skip}>
              <SvgXml width={75} xml={skipXML} />
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playbackControlRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
});
