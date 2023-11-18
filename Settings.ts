import { Chords } from "./music_theory/Chord";
import { Intervals } from "./music_theory/Interval";
import { SettingsDataT } from "./screens/RootStackPrams";

const SettingsData: SettingsDataT = {
  trainingMode: "passive",
  notesMode: "chords",
  playbackSpeed: 'slow',
  chords: {
    range: {
      low: 3,
      high: 6,
    },
    chordsToQuiz: [
      Chords.major,
      Chords.minor,
      Chords.diminished,
      Chords.augmented,
    ],
  },
  intervals: {
    range: {
      low: 3,
      high: 6,
    },
    progression: 'ascend',
    intervalsToQuiz: [
      Intervals.unison,
      Intervals.minorSecond,
      Intervals.majorSecond,
      Intervals.minorThird,
      Intervals.majorThird,
      Intervals.perfectFourth,
      Intervals.perfectFifth,
      Intervals.tritone,
      Intervals.minorSixth,
      Intervals.majorSixth,
      Intervals.minorSeventh,
      Intervals.majorSeventh,
      Intervals.octave,
    ],
  },
};

export default SettingsData;
