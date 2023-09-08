import { Interval } from "./Interval";
import { Chord } from "./Chord";
import { Note } from "./Note";
import { NoteName } from "./NoteName";
import SettingsData from "../Settings";

//Contains public entrypoints for the user interface to receive random chords and intervals

const getRandomNoteName = () => {
  const noteNames = Object.values(NoteName);
  return noteNames[randomIntInRange(0, noteNames.length)];
};

//Returns a new Note object with a random octave from 1-8.
export const getRandomNote = (): Note => {
  const chosenNoteName = getRandomNoteName();
  const chosenOctave = randomIntInRange(1, 8);
  return new Note(chosenNoteName, chosenOctave);
};

//Returns a new Note object with a random octave from 1-8 and a noteName belonging to the provided pitch class
//(a pitch class is the same thing as a note name, e.g. C#, A, Gb, etc.)
export const getRandomNoteOfPitchClass = (pitchClass: NoteName) => {
  const chosenOctave = randomIntInRange(1, 8);
  return new Note(pitchClass, chosenOctave);
};

//Returns a random ascending interval using notes from octaves 3-8.
export const getRandomIntervalAscending = (): Interval => {
  const possibleIntervals = SettingsData.intervals.intervalsToQuiz;
  const chosenInterval =
    possibleIntervals[randomIntInRange(0, possibleIntervals.length)];
  const startingNote = getRandomNote();
  return Interval.AscendingInterval(startingNote, chosenInterval);
};

//Returns a random descending interval using notes from octaves 1-8.
export const getRandomIntervalDescending = (): Interval => {
  const possibleIntervals = SettingsData.intervals.intervalsToQuiz;
  const chosenInterval =
    possibleIntervals[randomIntInRange(0, possibleIntervals.length)];
  const startingNote = getRandomNote();
  return Interval.DescendingInterval(startingNote, chosenInterval);
};

//Returns a random ascending interval starting on the specified note.
export const getRandomIntervalAscendingFromNote = (
  startingNote: Note,
): Interval => {
  const possibleIntervals = SettingsData.intervals.intervalsToQuiz;
  const chosenInterval =
    possibleIntervals[randomIntInRange(0, possibleIntervals.length)];
  return Interval.AscendingInterval(startingNote, chosenInterval);
};

//Returns a random descending interval starting on the specified note.
export const getRandomIntervalDescendingFromNote = (
  startingNote: Note,
): Interval => {
  const possibleIntervals = SettingsData.intervals.intervalsToQuiz;
  const chosenInterval =
    possibleIntervals[randomIntInRange(0, possibleIntervals.length)];
  return Interval.DescendingInterval(startingNote, chosenInterval);
};

export const getRandomRootPositionTriad = (): Chord => {
  const rootNote = getRandomNote();
  const rootPositionTriadMethods = [
    Chord.RootPositionMinorTriad,
    Chord.RootPositionMajorTriad,
    Chord.AugmentedTriad,
    Chord.DiminishedTriad,
  ];
  const chosenFunc = rootPositionTriadMethods[
    randomIntInRange(0, rootPositionTriadMethods.length)
  ];
  return chosenFunc(rootNote);
};

const randomIntInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
