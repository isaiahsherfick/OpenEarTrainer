import { Note } from "./Note";
import { Interval, Intervals } from "./Interval";

export const Chords = {
  major: 0,
  minor: 1,
  diminished: 2,
  augmented: 3,
};

export class Chord {
  notes: Note[];
  quality: Chords;

  private constructor(rootNote: Note, third: Note, fifth: Note, quality: Chords) {
    this.notes = [];
    this.notes[0] = rootNote;
    this.notes[1] = third;
    this.notes[2] = fifth;
    this.quality = quality;
  }

  getSoundFileNames(): string[] {
    const soundFileNames: string[] = [];
    for (let note of this.notes) {
      soundFileNames.push(note.getSoundFileName());
    }
    return soundFileNames;
  }

  public static RootPositionMajorTriad(rootNote: Note): Chord {
    const quality = Chords.major;
    const rootToThird = Interval.AscendingInterval(
      rootNote,
      Intervals.majorThird,
    );
    const third = rootToThird.note2;
    const thirdToFifth = Interval.AscendingInterval(
      third,
      Intervals.minorThird,
    );
    const fifth = thirdToFifth.note2;
    return new Chord(rootNote, third, fifth, quality);
  }

  public static RootPositionMinorTriad(rootNote: Note): Chord {
    const quality = Chords.minor;
    const rootToThird = Interval.AscendingInterval(
      rootNote,
      Intervals.minorThird,
    );
    const third = rootToThird.note2;
    const thirdToFifth = Interval.AscendingInterval(
      third,
      Intervals.majorThird,
    );
    const fifth = thirdToFifth.note2;
    return new Chord(rootNote, third, fifth, quality);
  }

  public static DiminishedTriad(rootNote: Note): Chord {
    const quality = Chords.diminished;
    const rootToThird = Interval.AscendingInterval(
      rootNote,
      Intervals.minorThird,
    );
    const third = rootToThird.note2;
    const thirdToFifth = Interval.AscendingInterval(
      third,
      Intervals.minorThird,
    );
    const fifth = thirdToFifth.note2;
    return new Chord(rootNote, third, fifth, quality);
  }

  public static AugmentedTriad(rootNote: Note): Chord {
    const quality = Chords.augmented;
    const rootToThird = Interval.AscendingInterval(
      rootNote,
      Intervals.majorThird,
    );
    const third = rootToThird.note2;
    const thirdToFifth = Interval.AscendingInterval(
      third,
      Intervals.majorThird,
    );
    const fifth = thirdToFifth.note2;
    return new Chord(rootNote, third, fifth, quality);
  }
}
