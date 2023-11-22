import React, { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import SoundEngine from "../music_theory/SoundEngine";
import { Chord } from "../music_theory/Chord";
import { Interval } from "../music_theory/Interval";
import { getNextChordOrInterval } from "../music_theory/NotesGenerator";

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
        currentChordOrIntervalRef.current = getNextChordOrInterval(settings)
        console.log('USE - generateChordOrInterval', currentChordOrIntervalRef.current)
        if (currentChordOrIntervalRef.current instanceof Interval) {
            return [currentChordOrIntervalRef.current.note1, currentChordOrIntervalRef.current.note2]
        }
        else { // notesMode === 'chords'
            return currentChordOrIntervalRef.current.notes
        }
    }

    return {
        currentChordOrIntervalRef,
        playNext, playPassive, pausePassive, replay
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