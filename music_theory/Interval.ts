import { Note } from './Note';
import { NoteName} from './Notename';

export function PerfectUnison(note: Note) {
    const secondNote = Note(note.noteName, note.octave);
    const unison = Interval(note, secondNote);
}

export function MinorSecondAbove(note: Note) {
    const secondNote = Note()
}

export class Interval {
    note1: Note;
    note2: Note;

    constructor(note1: Note, note2: Note) {
        this.note1 = note1;
        this.note2 = note2;
    }
}


const minorSeconds = {
    NoteName.A: NoteName.Bb,
    NoteName.A#: NoteName.B,

}
