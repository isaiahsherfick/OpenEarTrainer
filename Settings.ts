import { Chords } from './music_theory/Chord';
import { Intervals } from './music_theory/Interval';
import { SettingsDataT } from "./screens/RootStackPrams"

const SettingsData: SettingsDataT = {
    trainingMode: 'Passive',
    notesMode: 'Chords',
    chords: {
        range: {
            low: 'A1',
            high: 'C8'
        },
        chordsToQuiz: [
            Chords.major,
            Chords.minor,
            Chords.diminished,
            Chords.augmented
        ]
    },
    intervals: {
        range: {
            low: 'A1',
            high: 'C8'
        },
        intervalsToQuiz: [
            Intervals.unison,
            Intervals.minorSecond,
            Intervals.majorSecond,
            Intervals.minorThird,
            Intervals.majorThird,
            Intervals.perfectFourth,
            Intervals.perfectFifth,
            // Intervals.tritone,
            // Intervals.minorSixth,
            // Intervals.majorSixth,
            // Intervals.minorSeventh,
            // Intervals.majorSeventh,
            // Intervals.octave
        ]
    }
}

export default SettingsData