import { Interval } from "../Interval";
import { Chord } from "../Chord";
import {
  getRandomIntervalAscending,
  getRandomRootPositionTriad,
} from "../NotesGenerator";

describe("TrainingEngine", () => {
  it("Should be able to generate random ascending intervals", () => {
    let randomInterval: Interval = getRandomIntervalAscending();
    expect(randomInterval).toBeInstanceOf(Interval);
  });
  it("Should be able to generate random root position triads", () => {
    let randomChord: Chord = getRandomRootPositionTriad();
    expect(randomChord).toBeInstanceOf(Chord);
  });
});
