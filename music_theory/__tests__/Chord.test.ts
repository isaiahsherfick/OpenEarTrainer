import {Note} from '../Note';
import {NoteName} from '../NoteName';
import {Chord} from '../Chord';

describe('Chord', () => {
    it('Should be able to generate root position major chords', () => {
        let note = new Note(NoteName.B,3);
        let expectedThird = new Note(NoteName.DSharp,4);
        let expectedFifth = new Note(NoteName.FSharp,4);
        let chord = Chord.RootPositionMajorTriad(note);
        let actualThird = chord.notes[1];
        let actualFifth = chord.notes[2];
        expect(actualThird).toEqual(expectedThird);
        expect(actualFifth).toEqual(expectedFifth);

        note = new Note(NoteName.C,3);
        expectedThird = new Note(NoteName.E,3);
        expectedFifth = new Note(NoteName.G,3);
        chord = Chord.RootPositionMajorTriad(note);
        actualThird = chord.notes[1];
        actualFifth = chord.notes[2];
        expect(actualThird).toEqual(expectedThird);
        expect(actualFifth).toEqual(expectedFifth);
    });
    it('Should be able to generate root position minor chords', () => {
        let note = new Note(NoteName.B,3);
        let expectedThird = new Note(NoteName.D,4);
        let expectedFifth = new Note(NoteName.FSharp,4);
        let chord = Chord.RootPositionMinorTriad(note);
        let actualThird = chord.notes[1];
        let actualFifth = chord.notes[2];
        expect(actualThird).toEqual(expectedThird);
        expect(actualFifth).toEqual(expectedFifth);

        note = new Note(NoteName.C,3);
        expectedThird = new Note(NoteName.DSharp,3); // this shouuuuld be EFlat, but I'll figure out how to make it nitpicky about that later
        expectedFifth = new Note(NoteName.G,3);
        chord = Chord.RootPositionMinorTriad(note);
        actualThird = chord.notes[1];
        actualFifth = chord.notes[2];
        expect(actualThird).toEqual(expectedThird);
        expect(actualFifth).toEqual(expectedFifth);
    });

    it('Should be able to generate diminished chords', () => {
        let note = new Note(NoteName.B,3);
        let expectedThird = new Note(NoteName.D,4);
        let expectedFifth = new Note(NoteName.F,4);
        let chord = Chord.DiminishedTriad(note);
        let actualThird = chord.notes[1];
        let actualFifth = chord.notes[2];
        expect(actualThird).toEqual(expectedThird);
        expect(actualFifth).toEqual(expectedFifth);

        note = new Note(NoteName.C,3);
        expectedThird = new Note(NoteName.DSharp,3); // this shouuuuld be EFlat, but I'll figure out how to make it nitpicky about that later
        expectedFifth = new Note(NoteName.FSharp,3);
        chord = Chord.DiminishedTriad(note);
        actualThird = chord.notes[1];
        actualFifth = chord.notes[2];
        expect(actualThird).toEqual(expectedThird);
        expect(actualFifth).toEqual(expectedFifth);
    });

    it('Should be able to generate augmented chords', () => {
        let note = new Note(NoteName.B,3);
        let expectedThird = new Note(NoteName.DSharp,4);
        let expectedFifth = new Note(NoteName.G,4);
        let chord = Chord.AugmentedTriad(note);
        let actualThird = chord.notes[1];
        let actualFifth = chord.notes[2];
        expect(actualThird).toEqual(expectedThird);
        expect(actualFifth).toEqual(expectedFifth);

        note = new Note(NoteName.C,3);
        expectedThird = new Note(NoteName.E,3); // this shouuuuld be EFlat, but I'll figure out how to make it nitpicky about that later
        expectedFifth = new Note(NoteName.GSharp,3);
        chord = Chord.AugmentedTriad(note);
        actualThird = chord.notes[1];
        actualFifth = chord.notes[2];
        expect(actualThird).toEqual(expectedThird);
        expect(actualFifth).toEqual(expectedFifth);
    });
});
