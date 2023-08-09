//We are including enharmonic equivalencies even though they are somewhat redundant from a computational perspective
//because it will make it easier to display the proper name of each note in a given chord or interval downstream.
//If you aren't a theory nerd just take my word for it: the distinction between 'Cb' and 'B' matters.
export enum NoteName {
    A = 'A',
    ASharp = 'A#',
    AFlat = 'Ab',
    ADoubleSharp = 'Ax',
    ADoubleFlat = 'Abb',
    B = 'B',
    BSharp = 'B#',
    BFlat = 'Bb',
    BDoubleSharp = 'Bx',
    BDoubleFlat = 'Bbb',
    C = 'C',
    CSharp = 'C#',
    CFlat = 'Cb',
    CDoubleSharp = 'Cx',
    CDoubleFlat = 'Cbb',
    D = 'D',
    DSharp = 'D#',
    DFlat = 'Db',
    DDoubleSharp = 'Dx',
    DDoubleFlat = 'Dbb',
    E = 'E',
    ESharp = 'E#',
    EFlat = 'Eb',
    EDoubleSharp = 'Ex',
    EDoubleFlat = 'Ebb',
    F = 'F',
    FSharp = 'F#',
    FFlat = 'Fb',
    FDoubleSharp = 'Fx',
    FDoubleFlat = 'Fbb',
    G = 'G',
    GSharp = 'G#',
    GFlat = 'Gb',
    GDoubleSharp = 'Gx',
    GDoubleFlat = 'Gbb',
}