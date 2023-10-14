import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
    ActiveTraining: undefined;
    PassiveTraining: undefined;
    Settings: undefined;
};

export type PassiveTrainingProp = StackScreenProps<RootStackParamList, 'PassiveTraining'>;
export type ActiveTrainingProp = StackScreenProps<RootStackParamList, 'ActiveTraining'>;
export type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>;

export type NotesMode = 'chords' | 'intervals';
export type TrainingMode = 'active' | 'passive';
export type ProgressionT = 'ascend' | 'descend' | 'random'
export type PlaybackSpeedT = 'fast' | 'slow'

export type SettingsDataT = {
    trainingMode: TrainingMode,
    notesMode: NotesMode,
    playbackSpeed: PlaybackSpeedT
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
        progression: ProgressionT,
        intervalsToQuiz: number[]
    }
}