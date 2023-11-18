import { Interval, Intervals } from "./Interval";
import { Chord, Chords } from "./Chord";
import { Note } from "./Note";
import { NoteName } from "./NoteName";
import { SettingsDataT } from "../screens/RootStackPrams";
import SettingsData from "../Settings";


//Contains public entrypoints for the user interface to receive random chords and intervals


//This is THE public entrypoint
//takes in the settings object and generates the proper chord or interval
//frontend should only really call this method ideally
export const getNextChordOrInterval = (settings: SettingsDataT): Chord | Interval => {
  if (settings.notesMode == "chords") {
    const validChordQualities = settings.chords.chordsToQuiz;
    return getRootPositionTriad(validChordQualities);
  }
  else if (settings.notesMode == "intervals") {
    const intervalsToQuiz = settings.intervals.intervalsToQuiz;
    const playbackMode = settings.intervals.progression;
    if (playbackMode == "ascend") {
      return getRandomAscendingInterval(intervalsToQuiz);
    }
    else if (playbackMode == "descend") {
      return getRandomDescendingInterval(intervalsToQuiz);
    }
    else if (playbackMode == "simultaneous") {
      return getRandomAscendingInterval(intervalsToQuiz);
    }
  }
}

//Returns a random ascending interval using notes from octaves 3-8.
const getRandomAscendingInterval = (possibleIntervals: Intervals[]): Interval => {
  const chosenInterval =
    possibleIntervals[randomIntInRange(0, possibleIntervals.length - 1)];
  const startingNote = getRandomNote();
  return Interval.AscendingInterval(startingNote, chosenInterval);
};

//Returns a random descending interval using notes from octaves 3-8.
const getRandomDescendingInterval = (possibleIntervals: Intervals[]): Interval => {
  const chosenInterval =
    possibleIntervals[randomIntInRange(0, possibleIntervals.length - 1)];
  const startingNote = getRandomNote();
  return Interval.DescendingInterval(startingNote, chosenInterval);
};

const getRandomNoteName = () => {
  const noteNames = Object.values(NoteName);
  const randomInt = randomIntInRange(0, noteNames.length - 1);
  const chosenNoteName = noteNames[randomInt];
  return chosenNoteName;
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
    possibleIntervals[randomIntInRange(0, possibleIntervals.length - 1)];
  const startingNote = getRandomNote();
  return Interval.AscendingInterval(startingNote, chosenInterval);
};

//Returns a random descending interval using notes from octaves 1-8.
export const getRandomIntervalDescending = (): Interval => {
  const possibleIntervals = SettingsData.intervals.intervalsToQuiz;
  const chosenInterval =
    possibleIntervals[randomIntInRange(0, possibleIntervals.length - 1)];
  const startingNote = getRandomNote();
  return Interval.DescendingInterval(startingNote, chosenInterval);
};

//Returns a random ascending interval starting on the specified note.
export const getRandomIntervalAscendingFromNote = (
  startingNote: Note,
): Interval => {
  const possibleIntervals = SettingsData.intervals.intervalsToQuiz;
  const chosenInterval =
    possibleIntervals[randomIntInRange(0, possibleIntervals.length - 1)];
  return Interval.AscendingInterval(startingNote, chosenInterval);
};

//Returns a random descending interval starting on the specified note.
export const getRandomIntervalDescendingFromNote = (
  startingNote: Note,
): Interval => {
  const possibleIntervals = SettingsData.intervals.intervalsToQuiz;
  const chosenInterval =
    possibleIntervals[randomIntInRange(0, possibleIntervals.length - 1)];
  return Interval.DescendingInterval(startingNote, chosenInterval);
};

const getRootPositionTriad = (qualities: Chords[]): Chord => {
  //TODO: use settings.chords.range to restrict the range instead of this
  let rootNote = getRandomNote();
  while (rootNote.octave >= 7) {
    rootNote = getRandomNote();
  }
  const rootPositionTriadMethods = [];
  if (Chords.major in qualities) {
    rootPositionTriadMethods.push(Chord.RootPositionMajorTriad);
  }
  if (Chords.minor in qualities) {
    rootPositionTriadMethods.push(Chord.RootPositionMinorTriad);
  }
  if (Chords.augmented in qualities) {
    rootPositionTriadMethods.push(Chord.AugmentedTriad);
  }
  if (Chords.diminished in qualities) {
    rootPositionTriadMethods.push(Chord.DiminishedTriad);
  }
  const chosenFunc = rootPositionTriadMethods[
    randomIntInRange(0, rootPositionTriadMethods.length - 1)
  ];
  return chosenFunc(rootNote);
};

export const getRandomRootPositionTriad = (): Chord => {
  let rootNote = getRandomNote();
  while (rootNote.octave >= 7) {
    rootNote = getRandomNote();
  }
  const rootPositionTriadMethods = [
    Chord.RootPositionMinorTriad,
    Chord.RootPositionMajorTriad,
    Chord.AugmentedTriad,
    Chord.DiminishedTriad,
  ];
  const chosenFunc = rootPositionTriadMethods[
    randomIntInRange(0, rootPositionTriadMethods.length - 1)
  ];
  return chosenFunc(rootNote);
};

const randomIntInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
