import { createContext, useContext, useEffect, useState } from "react";
import { Note } from "../music_theory/Note";
import Sound from "react-native-sound";
import { SettingsDataT } from "../screens/RootStackPrams";
import { NotesQueue } from "./useTrainingEngine";


export const SoundEngineContext = createContext({
    startPassive: () => new Promise<void>(() => { }),
    stopPlaying: () => { },
    pausePassive: () => { },
    next: () => new Promise<void>(() => { }),
    replay: () => new Promise<void>(() => { })
})

export function useSoundEngine(
    settings: SettingsDataT,
    nextNotes: () => Promise<Note[] | undefined>,
    currentNotes: () => Note[],
    // notesQueue: NotesQueue
) {
    const [activeSounds, setActiveSounds] = useState<Sound[]>()
    const [preloadedSounds, setPreloadedSounds] = useState<Sound[]>()
    const [looping, setLooping] = useState(false)
    const [playbackFin, setPlaybackFin] = useState(true)

    useEffect(() => {
        console.log('sound engine reloaded')
        stopPlaying()
        setLooping(false)
        setPlaybackFin(true)

        const current = currentNotes()

        if (!current) return
        loadSounds(currentNotes())
    }, [settings.notesMode, settings.trainingMode])

    // ensures that in passive mode the next sound only plays when the first sound ends
    useEffect(() => {
        console.log('SE - sound finished playing')
        if (looping) {
            next()
        }
        if (settings.trainingMode === 'active' && settings.notesMode === 'intervals' && playbackFin) {
            next()
        }
    }, [playbackFin, looping])

    // useEffect(()=>{
    //     console.log('SE - interval counter', intervalCounter)
    //     if (settings.trainingMode==='active' && intervalCounter%2) {
    //         next()
    //     }
    // },[intervalCounter])


    /* passive training actions */
    const startPassive = async () => {
        setLooping(true)
    }

    const pausePassive = () => {
        stopPlaying()
        setLooping(false)
    }

    /**
     * stop all sounds 
     */
    const stopPlaying = () => {
        if (activeSounds) {
            activeSounds.forEach(sound => {
                sound.stop()
                sound.release()
            })
            setActiveSounds(undefined)
        }
    }

    /* active training actions */
    const next = async () => {
        stopPlaying()
        await loadNextSounds()

        activatePreloaded()

        debugSounds('SE - next - activeSounds', activeSounds)
    }

    const replay = play

    /* private helper functions */

    const activatePreloaded = () => {
        setActiveSounds(preloadedSounds)
    }

    useEffect(() => { play() }, [activeSounds])

    async function play() {
        if (!activeSounds) return

        // play each sound
        await Promise.all(multiSoundplayPromise(activeSounds))
        setPlaybackFin(prev => !prev)

    }

    const loadSounds = async (notes: Note[]) => {
        const soundPromises = constructSoundPromises(notes)
        const sounds = await Promise.all(soundPromises)
        debugSounds('SE - loadSounds', sounds)
        setPreloadedSounds(sounds)
    }

    const loadNextSounds = async () => {
        // swap state with the next batch of Sound objects
        const next = await nextNotes()

        console.log('SE - next', next)

        if (next) {
            await loadSounds(next)
        }
    }

    const constructSoundPromises = (notes: Note[]): Promise<Sound>[] => {
        const promises: Promise<Sound>[] = notes.map(
            (note) => new Promise((resolve, reject) => {
                let fileName = note.getSoundFileName() // WARNING hacky workaround until Note.ts refactor
                fileName = fileName.substring(0, 1).toUpperCase() + fileName.substring(1) // WARNING hacky workaround until Note.ts refactor
                const sound = new Sound(
                    fileName,
                    Sound.MAIN_BUNDLE,
                    (err) => {
                        if (err) {
                            reject(`error loading sound file for ${note.getSoundFileName()}`)
                        }
                        resolve(sound)
                    }
                )
            }))
        return promises
    }

    const multiSoundplayPromise = (sound: Sound[]): Promise<void>[] => {
        return sound.map(s => new Promise((resolve, reject) => {
            s.play(success => {
                if (success) {
                    resolve()
                }
                else reject('unable to play notes')
            })
        }))
    }

    return { SoundEngineContext, startPassive, pausePassive, stopPlaying, next, replay }
}

function debugSounds(caption: string, sounds?: Sound[]) {
    console.log(caption)
    if (!sounds) return
    sounds.forEach(s => {
        console.log(`     ${s['_filename'].substring(186)}`, '    loaded:', s['_loaded'], '    playing:', s['_playing'])
    });
}