import { Note } from '../Note';
import { NoteNames } from '../NoteNames';

describe('Note', () => {
  it('should be able to create a new note with correct properties', () => {
    const note = new Note('A', 4);
    expect(note).toHaveProperty('name', 'A');
    expect(note).toHaveProperty('octave', 4);
  })
});
