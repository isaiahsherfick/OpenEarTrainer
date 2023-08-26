import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
    ActiveTraining: undefined;
    PassiveTraining: undefined;
    Settings: undefined;
};

export type PassiveTrainingProp = StackScreenProps<RootStackParamList, 'PassiveTraining'>;
export type ActiveTrainingProp = StackScreenProps<RootStackParamList, 'ActiveTraining'>;
export type SettignsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>;

export type NotesMode = 'Chords' | 'Intervals';
export type TrainingMode = 'Active' | 'Passive';

export type SettingsDataT = {
    trainingMode: TrainingMode,
    notesMode: NotesMode,
    chords: {
        range: {
            low: string,
            high: string
        },
        chordsToQuiz: {
            major: boolean,
            minor: boolean,
            diminished: boolean,
            augmented: boolean
        }
    },
    intervals: {
        range: {
            low: string,
            high: string
        },
        intervalsToQuiz: {
            unison: boolean,
            minorSecond: boolean,
            majorSecond: boolean,
            minorThird: boolean,
            majorThird: boolean,
            perfectFourth: boolean,
            perfectFifth: boolean,
            tritone: boolean,
            minorSixth: boolean,
            majorSixth: boolean,
            minorSeventh: boolean,
            majorSeventh: boolean,
            octave: boolean
        }
    }
}