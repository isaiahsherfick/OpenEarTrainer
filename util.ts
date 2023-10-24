import Sound from "react-native-sound";
import { Note } from "./music_theory/Note";

export function debugSounds(caption: string, sounds?: Sound[]) {
    console.log(caption)
    if (!sounds) return
    sounds.forEach(s => {
        console.log(`     ${s['_filename'].slice(-16)}`, '    loaded:', s['_loaded'], '    playing:', s['_playing'])
    });
}

export function debugNotes(caption: string, notes?: Note[]) {
    console.log(caption)
    if (!notes) return
    notes.forEach(n => {
        console.log(`     ${n.noteName} +${n.octave}`)
    });
}

