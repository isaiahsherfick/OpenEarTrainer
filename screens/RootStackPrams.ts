import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
    ActiveTraining: undefined;
    PassiveTraining: undefined;
    Settings: undefined;
};

export type PassiveTrainingProp = StackScreenProps<RootStackParamList, 'PassiveTraining'>;
export type ActiveTrainingProp = StackScreenProps<RootStackParamList, 'ActiveTraining'>;
export type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>;

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
        chordsToQuiz: number[]
    },
    intervals: {
        range: {
            low: string,
            high: string
        },
        intervalsToQuiz: number[]
    }
}