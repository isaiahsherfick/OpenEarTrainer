import {NoteName} from './NoteName';

//public exported Note class
//encapsulates a note and is responsible for handling enharmonic equivalency conversions
export class Note {
    noteName: NoteName;
    octave: number;

    constructor(noteName: NoteName, octave: number) {
        this.noteName = noteName;
        this.octave = octave;
    }

    getSoundFileName() {
        let noteName = this.noteName.toString();
        let octave = this.octave;
        octave = handleOctaveShiftEdgeCases(noteName, octave);
        //if noteName has an enharmonic equivalent with either no sharps or a single sharp, change it to that
        if (enharmonicEquivalencies.has(noteName)) {
            noteName = enharmonicEquivalencies.get(noteName) as string;
        }
        noteName = noteName.replace('#', 'sharp');
        return noteName + octave + 'piano.mp3';
    }

    //Returns the enharmonic equivalent of the note as either a natural or a sharp.
    //Used to simplify interval and chord calculations in other modules.
    getEnharmonicEquivalentName(): string {
        const noteName = this.noteName.toString();
        if (enharmonicEquivalencies.has(noteName)) {
            return enharmonicEquivalencies.get(noteName) as string;
        }
        return this.noteName.toString();
    }
}

//Needed to handle converting note noteNames to exclusively natural or sharp
const enharmonicEquivalencies: Map<string, string> = new Map([
    ['Ab', 'G#'],
    ['Abb', 'G'],
    ['Ax', 'B'],
    ['B#', 'C'],
    ['Bb', 'A#'],
    ['Bbb', 'A'],
    ['Bx', 'C#'],
    ['Cb', 'B'],
    ['Cbb', 'A#'],
    ['Cx', 'D'],
    ['Db', 'C#'],
    ['Dbb', 'C'],
    ['Dx', 'E'],
    ['E#', 'F'],
    ['Eb', 'D#'],
    ['Ebb', 'D'],
    ['Ex', 'F#'],
    ['Fb', 'E'],
    ['Fbb', 'D#'],
    ['Fx', 'G'],
    ['Gb', 'F#'],
    ['Gbb', 'F'],
    ['Gx', 'A'],
]);
//private helper functions

//looks at a note and returns the proper octave designation.
//consider the case where we have a note like Cb. Cb3 != B3; Cb3 == B2. Similarly B#2 != C2; B#2 == C3.
//enharmonic equivalencies are fun, aren't they?
function handleOctaveShiftEdgeCases(noteName: string, octave: number): number {
    if (noteName.includes('B')) {
        //B# / Bx case -- increase octave
        if (noteName.includes('#') || noteName.includes('x')) {
            return octave + 1;
        }
    } else if (noteName.includes('C')) {
        //Cb / Cbb case -- decrease octave
        if (noteName.includes('b')) {
            return octave - 1;
        }
    }
    return octave;
}
