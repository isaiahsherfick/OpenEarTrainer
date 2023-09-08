import { Note } from './Note';
import { NoteName } from './NoteName';

//half steps
export const Intervals = {
    unison: 0,
    minorSecond: 1,
    majorSecond: 2,
    minorThird: 3,
    majorThird: 4,
    perfectFourth: 5,
    tritone: 6,
    perfectFifth: 7,
    minorSixth: 8,
    majorSixth: 9,
    minorSeventh: 10,
    majorSeventh: 11,
    octave: 12,
};

export class Interval {
    note1: Note;
    note2: Note;

    private constructor(note1: Note, note2: Note) {
        this.note1 = note1;
        this.note2 = note2;
    }

    public equals(other: Interval): boolean {
        const note1sEqual: boolean = this.note1.getEnharmonicEquivalentName() === other.note1.getEnharmonicEquivalentName();
        const note2sEqual: boolean = this.note2.getEnharmonicEquivalentName() === other.note2.getEnharmonicEquivalentName();
        return note1sEqual && note2sEqual;
    }

    public static AscendingInterval(startingNote: Note, numHalfSteps: number): Interval {
        const noteAsNaturalOrSharp = startingNote.getEnharmonicEquivalentName();
        const startingNoteIndex = NotesInHalfSteps.indexOf(noteAsNaturalOrSharp as NoteName);
        let targetNoteIndex = startingNoteIndex + numHalfSteps;
        let octavesToIncrease = 0;
        while (targetNoteIndex > NotesInHalfSteps.length) {
            targetNoteIndex %= 12;
            octavesToIncrease += 1;
        }
        const startingNoteOctave = startingNote.octave;
        const targetNoteName = NotesInHalfSteps[targetNoteIndex];
        const targetNote = new Note(targetNoteName, startingNoteOctave + octavesToIncrease);
        return new Interval(startingNote, targetNote)
    }

    public static DescendingInterval(startingNote: Note, numHalfSteps: number): Interval {
        const noteAsNaturalOrSharp = startingNote.getEnharmonicEquivalentName();
        const startingNoteIndex = NotesInHalfSteps.indexOf(noteAsNaturalOrSharp as NoteName);
        let targetNoteIndex = startingNoteIndex - numHalfSteps;
        let octavesToDecrease = 0;
        while (targetNoteIndex < 0) {
            targetNoteIndex += 12;
            octavesToDecrease += 1;
        }
        const startingNoteOctave = startingNote.octave;
        const targetNoteName = NotesInHalfSteps[targetNoteIndex];
        const targetNote = new Note(targetNoteName, startingNoteOctave - octavesToDecrease);
        return new Interval(startingNote, targetNote)
    }
}

//This array is how we will automatically calculate the second note of the interval. We will take the starting 
//note's name, convert it to a natural or sharp if not already, then use the "Intervals" object above and 
//choose the note which is that distance away from our starting note in this array.
const NotesInHalfSteps = [
    NoteName.C,
    NoteName.CSharp,
    NoteName.D,
    NoteName.DSharp,
    NoteName.E,
    NoteName.F,
    NoteName.FSharp,
    NoteName.G,
    NoteName.GSharp,
    NoteName.A,
    NoteName.ASharp,
    NoteName.B
];
