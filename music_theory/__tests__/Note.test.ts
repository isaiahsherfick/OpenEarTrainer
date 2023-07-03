import {Note} from '../Note';
import {NoteName} from '../NoteName';

describe('Note', () => {
    it('should be able to create a new note with correct properties', () => {
        const note = new Note(NoteName.A, 4);
        expect(note).toHaveProperty('name', NoteName.A);
        expect(note).toHaveProperty('octave', 4);
    });
    it('should be able to calculate the frequency of A6', () => {
        const note = new Note(NoteName.A, 6);
        expect(note.getFrequency()).toBeCloseTo(1760);
    });

    it('should be able to calculate the frequency of GSharp6', () => {
        const note = new Note(NoteName.GSharp, 6);
        expect(note.getFrequency()).toBeCloseTo(1661.219);
    });

    it('should be able to calculate the frequency of G6', () => {
        const note = new Note(NoteName.G, 6);
        expect(note.getFrequency()).toBeCloseTo(1567.982);
    });

    it('should be able to calculate the frequency of FSharp6', () => {
        const note = new Note(NoteName.FSharp, 6);
        expect(note.getFrequency()).toBeCloseTo(1479.978);
    });

    it('should be able to calculate the frequency of C4 (Middle C)', () => {
        const note = new Note(NoteName.C, 4);
        expect(note.getFrequency()).toBeCloseTo(261.6256);
    });

    it('should be able to calculate the frequency of B3', () => {
        const note = new Note(NoteName.B, 3);
        expect(note.getFrequency()).toBeCloseTo(246.9417);
    });

    it('should be able to calculate the frequency of ASharp3', () => {
        const note = new Note(NoteName.ASharp, 3);
        expect(note.getFrequency()).toBeCloseTo(233.0819);
    });

    it('should be able to calculate the frequency of C1 (Pedal C)', () => {
        const note = new Note(NoteName.C, 1);
        expect(note.getFrequency()).toBeCloseTo(32.7032);
    });

    it('should be able to calculate the frequency of B0', () => {
        const note = new Note(NoteName.B, 0);
        expect(note.getFrequency()).toBeCloseTo(30.86771);
    });

    it('should be able to calculate the frequency of ASharp0', () => {
        const note = new Note(NoteName.ASharp, 0);
        expect(note.getFrequency()).toBeCloseTo(29.13524);
    });
});
