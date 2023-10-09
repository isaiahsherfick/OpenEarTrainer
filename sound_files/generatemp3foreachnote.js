//This script generates a 1 second long .mp3 file for each note using a basic MIDI piano sound and saves
//them to this directory in the format [notename][octavedesignation]piano.mp3.
//
//NOTE: This script treats all accidentals as sharps to save storage space.
//The music_theory module is responsible for understanding enharmonic equivalencies

const MidiWriter = require('midi-writer-js');
const {exec} = require('child_process');
const fs = require('fs');

// Define an array of notes
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Define the range of octaves
const minOctave = 0;
const maxOctave = 8;

// Generate a MIDI and MP3 for each note in each octave
for (let octave = minOctave; octave <= maxOctave; octave++) {
    for (let note of notes) {
        let track = new MidiWriter.Track();

        // Define an instrument (piano in this case, which is MIDI 1)
        track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: 1}));

        // Add a note
        // duration: 2 makes it a half note, which lasts exactly 1 second at MIDI's default tempo of 120bpm
        let noteEvent = new MidiWriter.NoteEvent({
            pitch: [note + octave],
            duration: '2',
        });

        track.addEvent(noteEvent);

        // Generate a dataUri and convert it into a base64 string
        let write = new MidiWriter.Writer([track]);
        let base64String = write.base64();

        // Write the base64 string to a MIDI file
        fs.writeFileSync(
            `./${note.replace('#', 'sharp')}${octave}.mid`,
            base64String,
            'base64',
        );

        // Convert the MIDI file to MP3
        exec(
            `timidity ./${note.replace(
                '#',
                'sharp',
            )}${octave}.mid -Ow -o - | lame - -b 64 ./${note.replace(
                '#',
                'sharp',
            )}${octave}.mp3 && sox ./${note.replace(
                '#',
                'sharp',
            )}${octave}.mp3 ./${note.replace(
                '#',
                'sharp',
            )}${octave}piano.mp3 trim 0 1`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }

                // Once trimmed and converted to mp3, the original mp3 and MIDI files can be deleted
                fs.unlinkSync(`./${note.replace('#', 'sharp')}${octave}.mp3`);
                fs.unlinkSync(`./${note.replace('#', 'sharp')}${octave}.mid`);
            },
        );
    }
}
