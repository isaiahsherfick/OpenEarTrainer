import {NoteName} from './NoteName';

export class Note {
    name: NoteName;
    octave: number;

    constructor(name: NoteName, octave: number) {
        this.name = name;
        this.octave = octave;
    }

    getFrequency() {
        const frequencyOfOctave0 = BaseNoteFrequencies[this.name];
        return frequencyOfOctave0 * Math.pow(2, this.octave);
    }
}
//These frequences are for the occurrence of each note in OCTAVE 0 (Notes below A0 (C0 - Ab/G#0) do not appear on a standard 88-key keyboard,
//but using them here makes calculation of subsequent octaves easier and consistent for all notes).
//Each subsequent frequency can be calculated easily by multiplying the frequencies listed here by 2^n, where n is the octave of the note whose frequency we want to calculate
//frequencies taken from https://en.wikipedia.org/wiki/Piano_key_frequencies
const BaseNoteFrequencies = {
    [NoteName.A]: 27.5,
    [NoteName.ASharp]: 29.13524,
    [NoteName.AFlat]: 25.95654,
    [NoteName.B]: 30.86771,
    [NoteName.BSharp]: 32.7032, //C1
    [NoteName.BFlat]: 29.13524,
    [NoteName.C]: 16.3516,
    [NoteName.CSharp]: 17.32391,
    [NoteName.CFlat]: 15.43385,
    [NoteName.D]: 18.35405,
    [NoteName.DSharp]: 19.44544,
    [NoteName.DFlat]: 17.32391,
    [NoteName.E]: 20.60172,
    [NoteName.ESharp]: 21.82676,
    [NoteName.EFlat]: 19.44544,
    [NoteName.F]: 21.82676,
    [NoteName.FSharp]: 23.12465,
    [NoteName.FFlat]: 20.60172,
    [NoteName.G]: 24.49971,
    [NoteName.GSharp]: 25.95654,
    [NoteName.GFlat]: 23.12465,
    [NoteName.ADoubleSharp]: 30.86771, //B0
    [NoteName.ADoubleFlat]: 24.49971, //G0
    [NoteName.BDoubleSharp]: 34.64783, //C#1
    [NoteName.BDoubleFlat]: 27.5, //A0
    [NoteName.CDoubleSharp]: 18.35405, //D0
    [NoteName.CDoubleFlat]: 30.86771, //B0
    [NoteName.DDoubleSharp]: 20.60172, //E0
    [NoteName.DDoubleFlat]: 16.3516, //C0
    [NoteName.EDoubleSharp]: 23.12465, //F#0
    [NoteName.EDoubleFlat]: 18.35405, //D0
    [NoteName.FDoubleSharp]: 24.49971, //G0
    [NoteName.FDoubleFlat]: 19.44544, //D#0
    [NoteName.GDoubleSharp]: 27.5, //A0
    [NoteName.GDoubleFlat]: 21.82676, //F0
};
