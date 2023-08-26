import {Interval, Intervals} from './Interval';
import {Chord} from './Chord';
import {Note} from './Note';
import {NoteName} from './NoteName';
import SettingsData from '../Settings';

//Contains public entrypoints for the user interface to receive random chords and intervals

const getRandomNote = (): Note => {
    const noteNames = Object.values(NoteName);
    const chosenNoteName =
        noteNames[Math.floor(Math.random() * noteNames.length)];
    const chosenOctave = Math.floor(Math.random() * 8);
    return new Note(chosenNoteName, chosenOctave);
};

export const getRandomIntervalAscending = (): Interval => {
    const possibleIntervals = SettingsData.intervals.intervalsToQuiz;
    const chosenInterval =
        possibleIntervals[Math.floor(Math.random() * possibleIntervals.length)];
    const startingNote = getRandomNote(); // Assuming getRandomNote() function is correctly defined elsewhere
    return Interval.AscendingInterval(startingNote, chosenInterval); // Assuming Interval.AscendingInterval() is correctly defined elsewhere
};
