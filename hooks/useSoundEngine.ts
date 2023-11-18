import React, { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import SoundEngine from "../music_theory/SoundEngine";
import { Chord } from "../music_theory/Chord";
import { Interval } from "../music_theory/Interval";
import { getRandomIntervalAscending, getRandomIntervalDescending, getRandomRootPositionTriad } from "../music_theory/NotesGenerator";

export default function useSoundEngine() {
    const { settings } = useContext(SettingsContext)
    const [looping, setLooping] = useState(false)
    const [soundplayed, setSoundPlayed] = useState(false)
    const soundEngineRef = useRef(new SoundEngine(settings.notesMode))
    const currentChordOrIntervalRef = useRef<Chord | Interval>()

    useEffect(() => {
        soundEngineRef.current.cleanup()
        soundEngineRef.current.changeMode(settings.notesMode)
    }, [settings.notesMode])

    useEffect(() => {
        soundEngineRef.current.setSpeed(settings.playbackSpeed)
    }, [settings.playbackSpeed])

    const playNext = async () => {
        const notes = generateChordOrInterval()
        if (!notes) return
        await soundEngineRef.current.loadSounds(notes)
        await soundEngineRef.current.playSounds()
        if (looping) setSoundPlayed(prev => !prev)
    }

    const playPassive = () => {
        setLooping(true)

    }

    const pausePassive = () => {
        setLooping(false)
        soundEngineRef.current.pause()
    }

    const passive = () => {
        // let looping = true

        // while (looping) {
        //     throttle(() => {
        //         console.log('audio')
        //     })
        // }

        // return () => {
        //     looping = false
        // }
    }

    useEffect(() => {
        if (looping) {
            playNext()
        }
    }, [looping, soundplayed])

    const replay = async () => {
        await soundEngineRef.current.playSounds()
    }

    const generateChordOrInterval = () => {
        if (settings.notesMode === 'intervals') {
            let interval
            if (settings.intervals.progression === 'ascend') {
                interval = getRandomIntervalAscending()
            }
            else if (settings.intervals.progression === 'descend') {
                interval = getRandomIntervalDescending()
            }
            else { // progression === 'simultaneous'
                interval = getRandomIntervalAscending() // TODO replace placeholder call with something good
            }
            currentChordOrIntervalRef.current = interval
            return [interval.note1, interval.note2]
        }
        else { // notesMode === 'chords'
            const chord = getRandomRootPositionTriad()
            currentChordOrIntervalRef.current = chord
            return chord.notes
        }
    }

    return {
        currentChordOrIntervalRef,
        playNext, playPassive, pausePassive, replay, passive
    }
}

function throttle(callback: Function, delay = 1200) {
    let canExecute = true

    return (...args: any) => {
        if (!canExecute) return
        callback(...args)
        setTimeout(() => {
            canExecute = true
        }, delay);
    }
}