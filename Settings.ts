import { Intervals } from './music_theory/Interval';
const SettingsData = {
    trainingMode: 'Passive',
    notesMode: 'Chords',
    chords: {
        range: {
            low: 'A1',
            high: 'C8',
        },
        chordsToQuiz: {
            major: true,
            minor: true,
            diminished: true,
            augmented: true,
        },
    },
    intervals: {
        range: {
            low: 'A1',
            high: 'C8',
        },
        intervalsToQuiz: [
            Intervals.unison,
            Intervals.minorSecond,
            Intervals.majorSecond,
            Intervals.majorThird,
            Intervals.perfectFourth,
            Intervals.tritone,
            Intervals.perfectFifth,
            Intervals.minorSixth,
            Intervals.majorSixth,
            Intervals.minorSeventh,
            Intervals.majorSeventh,
            Intervals.octave,
        ],
    },
};

export default SettingsData;
