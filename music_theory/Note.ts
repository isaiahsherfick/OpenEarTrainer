import { NoteName } from './NoteName';

export class Note {
  name: NoteName;
  octave: number;
  
  constructor(name: NoteName, octave: number) {
    this.name = name;
    this.octave = octave;
  }
}
