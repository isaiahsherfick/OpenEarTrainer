import {Note} from '../Note';
import {NoteName} from '../NoteName';
import {Interval, Intervals} from '../Interval';

describe('Interval', () => {
    it('Should be able to generate ascending intervals', () => {
        const note = new Note(NoteName.A, 4);
        let expected = new Note(NoteName.CSharp, 5);
        let interval = Interval.AscendingInterval(note,Intervals.majorThird);
        let actual = interval.note2;
        expect(actual).toEqual(expected);

        expected = new Note(NoteName.B,4);
        interval = Interval.AscendingInterval(note,Intervals.majorSecond);
        actual = interval.note2;
        expect(actual).toEqual(expected);

        expected = new Note(NoteName.GSharp,5);
        interval = Interval.AscendingInterval(note,Intervals.majorSeventh);
        actual = interval.note2;
        expect(actual).toEqual(expected);
    });
    it('Should be able to generate unisons', () => {
        const note = new Note(NoteName.A, 4);
        const expected = new Note(NoteName.A, 4);
        let interval = Interval.AscendingInterval(note,Intervals.unison);
        let actual = interval.note2;
        expect(actual).toEqual(expected);

        interval = Interval.DescendingInterval(note,Intervals.unison);
        actual = interval.note2;
        expect(actual).toEqual(expected);
    });
    it('Should be able to generate descending intervals', () => {
        const note = new Note(NoteName.A, 4);
        const expected = new Note(NoteName.B, 3);
        let interval = Interval.DescendingInterval(note,Intervals.minorSeventh);
        let actual = interval.note2;
        expect(actual).toEqual(expected);
    });
    it('Should have a working equals method that can handle enharmonic equivalence', () => {
        const note1 = new Note(NoteName.FSharp, 4);
        const note2 = new Note(NoteName.GFlat,4);
        const interval1 = Interval.AscendingInterval(note1, Intervals.majorThird);
        const interval2 = Interval.AscendingInterval(note2, Intervals.majorThird);
        expect(interval1.equals(interval2)).toEqual(true);
    });
    it('Should be able to create a minor third above Bbb3', () => {
        const note1 = new Note(NoteName.BDoubleFlat, 3);
        const expected = new Note(NoteName.C,4);
        const interval = Interval.AscendingInterval(note1, Intervals.minorThird);
        const actual = interval.note2;
        expect(actual).toEqual(expected);
    });
    it('Should tell us what kind of interval it is', () => {
        const expected = Intervals.minorThird;
        const startingNote = new Note(NoteName.A, 3);
        const interval = Interval.AscendingInterval(startingNote, Intervals.minorThird);
        const actual = interval.numHalfSteps;
        expect(actual).toEqual(expected);
    });
});
