import { SettingsDataT } from "./screens/RootStackPrams"

const SettingsData: SettingsDataT = {
    trainingMode: 'Passive',
    notesMode: 'Chords',
    chords: {
        range: {
            low: 'A1',
            high: 'C8'
        },
        chordsToQuiz: {
            major: true,
            minor: true,
            diminished: true,
            augmented: true
        }
    },
    intervals: {
        range: {
            low: 'A1',
            high: 'C8'
        },
        intervalsToQuiz: {
            unison: true,
            minorSecond: true,
            majorSecond: true,
            minorThird: true,
            majorThird: true,
            perfectFourth: true,
            perfectFifth: true,
            tritone: true,
            minorSixth: true,
            majorSixth: true,
            minorSeventh: true,
            majorSeventh: true,
            octave: true
        }
    }
}

export default SettingsData