import { Note } from './Note';
import { NoteName} from './NoteName';
import { Interval, Intervals } from './Interval';


export class Chord {
    notes: Note[];

    private constructor(rootNote: Note, third: Note, fifth: Note) {
        this.notes = [];
        this.notes[0] = rootNote;
        this.notes[1] = third;
        this.notes[2] = fifth;
    }

    public static RootPositionMajorTriad(rootNote: note): Chord {
        const rootToThird = Interval.AscendingInterval(rootNote,Intervals.majorThird);
        const third = rootToThird.note2;
        const thirdToFifth = Interval.AscendingInterval(third,Intervals.minorThird);
        const fifth = thirdToFifth.note2;
        return new Chord(rootNote,third,fifth);
    }

    public static RootPositionMinorTriad(rootNote: note): Chord {
        const rootToThird = Interval.AscendingInterval(rootNote,Intervals.minorThird);
        const third = rootToThird.note2;
        const thirdToFifth = Interval.AscendingInterval(third,Intervals.majorThird);
        const fifth = thirdToFifth.note2;
        return new Chord(rootNote,third,fifth);
    }
}
