import Sound from 'react-native-sound'
import { NotesMode, TrainingMode, PlaybackSpeedT } from '../screens/RootStackPrams'
import { Note } from './Note'
import { debugNotes, debugSounds } from '../util'

Sound.setCategory('Playback')

interface SoundEngine {
    strategy: SoundEngineStrategy
    trainingMode: TrainingMode
    sounds: Sound[],
    playbackSpeed: PlaybackSpeedT
}

class SoundEngine {
    constructor(notesMode: NotesMode, playbackSpeed?: PlaybackSpeedT) {
        this.strategy = notesMode === 'chords' ? new ChordStrategy() : new IntervalStrategy()
        this.playbackSpeed = playbackSpeed ?? 'slow'
    }

    setSpeed(speed: PlaybackSpeedT) {
        this.playbackSpeed = speed
    }

    changeMode(notesMode: NotesMode) {
        this.strategy = notesMode === 'chords' ? new ChordStrategy() : new IntervalStrategy()
    }

    async loadSounds(notes: Note[]) {
        if (this.sounds) {
            this.cleanup()
        }
        const soundPromises = constructSoundPromises(notes)
        try {
            this.sounds = await Promise.all(soundPromises)
            this.sounds.forEach(s => {
                s.setSpeed(this.playbackSpeed === 'slow' ? 1 : 1.7)
            });
            return this
        }
        catch {

        }
    }

    async playSounds() {
        if (!this.sounds) return
        debugSounds('SE - playing', this.sounds)
        await this.strategy.play(this.sounds)
        return this
    }

    pause() {
        this.strategy.pause()
    }

    cleanup() {
        this.pause()
        this.sounds?.forEach(s => {
            s.release()
        });
    }
}

interface SoundEngineStrategy {
    play: (sounds: Sound[]) => Promise<void>
    pause: () => void
}

class IntervalStrategy implements SoundEngineStrategy {
    currentlyPlaying?: Sound

    async play(sounds: Sound[]) {
        this.currentlyPlaying = sounds[0]
        await singleSoundplayPromise(this.currentlyPlaying)
        this.currentlyPlaying = sounds[1]
        await singleSoundplayPromise(this.currentlyPlaying)
        this.currentlyPlaying = undefined
    }
    pause() {
        this.currentlyPlaying?.pause()
    }
}
class ChordStrategy implements SoundEngineStrategy {
    currentlyPlaying?: Sound[]

    async play(sounds: Sound[]) {
        this.currentlyPlaying = sounds
        await Promise.all(multiSoundplayPromise(sounds))
        this.currentlyPlaying = undefined
    }
    pause() {
        this.currentlyPlaying?.forEach(s => {
            s.pause()
        });
    }
}

function constructSoundPromises(notes: Note[]): Promise<Sound>[] {
    debugNotes('SE - loading', notes)
    const promises: Promise<Sound>[] = notes.map(
        (note) => new Promise((resolve, reject) => {
            let fileName = note.getSoundFileName()
            const sound = new Sound(
                fileName,
                Sound.MAIN_BUNDLE,
                (err) => {
                    if (err) {
                        reject(`error loading sound file ${fileName}`)
                    }
                    resolve(sound)
                }
            )
        }))
    return promises
}

function singleSoundplayPromise(sound: Sound): Promise<void> {
    return new Promise((resolve, reject) => {
        sound.play(success => {
            if (success) resolve()
            else reject('unable to play note')
        })
    })
}

function multiSoundplayPromise(sound: Sound[]): Promise<void>[] {
    return sound.map(s => new Promise((resolve, reject) => {
        s.play(success => {
            if (success) resolve()
            else reject('unable to play note')
        })
    }))
}

export default SoundEngine