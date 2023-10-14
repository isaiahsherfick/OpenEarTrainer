import { Note } from "../music_theory/Note";
import { getRandomIntervalAscending, getRandomIntervalDescending, getRandomRootPositionTriad } from "../music_theory/NotesGenerator";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import { NoteName } from "../music_theory/NoteName";
import { SettingsDataT } from "../screens/RootStackPrams";
import { Chord } from "../music_theory/Chord";
import { Interval } from "../music_theory/Interval";

export const TrainingEngineContext = createContext({
    nextNotes: () => new Promise<Note[] | undefined>(() => { }),
    currentNotes: () => [new Note(NoteName.A, 3)]
})

export function useTrainingEngine(settings: SettingsDataT) {
    const { notesMode, trainingMode, intervals } = settings

    const [currentChordOrInterval, setCurrentChordOrInterval] = useState<Chord | Interval>()

    const notesQueue = new NotesQueue()
    // const [notesQueue, setNotesQueue] = useState(new NotesQueue())

    useEffect(() => {
        console.log('training engine intialized')
    }, [])

    useEffect(() => {
        console.log('TE - notesMode changed -', notesMode, notesQueue.notes)
        notesQueue.flush()
        // setNotesQueue(prev => {
        //     prev.flush()
        //     return prev
        // })
        generateNotes()
    }, [notesMode])

    const nextNotes = async () => {
        if (!notesQueue.size()) {
            await generateNotes()
        }
        const notes = notesQueue.dequeue()
        console.log('TE - nextNotes', notes)
        return notes
    }

    const currentNotes = () => notesQueue.peek()

    const generateNotes = () => new Promise<void>((resolve) => {
        if (notesMode === 'intervals') {
            if (intervals.progression === 'ascend') {
                const interval = getRandomIntervalAscending()
                notesQueue.enqueue([interval.note1])
                notesQueue.enqueue([interval.note2])
                setCurrentChordOrInterval(interval)
            }
            if (intervals.progression === 'descend') {
                const interval = getRandomIntervalDescending()
                notesQueue.enqueue([interval.note1])
                notesQueue.enqueue([interval.note2])
                setCurrentChordOrInterval(interval)
            }
        }
        if (notesMode === 'chords') {
            console.log('TE - genNotes', notesMode)
            const chord = getRandomRootPositionTriad()
            notesQueue.enqueue(chord.notes)
            setCurrentChordOrInterval(chord)
        }
        console.log("TE - generateNotes", notesQueue.notes)
        resolve()
    })


    return { TrainingEngineContext, nextNotes, currentNotes, notesQueue }
}

export class NotesQueue {
    notes: Note[][]

    constructor() {
        this.notes = []
    }

    flush() {
        this.notes = []
    }

    enqueue(noteOrChord: Note[]) {
        this.notes.push(noteOrChord)
    }

    peek() {
        return this.notes[0]
    }

    dequeue() {
        return this.notes.shift();
    }

    size() {
        return this.notes.length
    }
}