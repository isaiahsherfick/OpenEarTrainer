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
});
