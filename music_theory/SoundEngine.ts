import Sound from 'react-native-sound'
import { getRandomIntervalAscending, getRandomIntervalDescending, getRandomRootPositionTriad } from './NotesGenerator'
import { SettingsDataT, ProgressionT } from '../screens/RootStackPrams'
import { Interval } from './Interval'
import { Note } from './Note'

Sound.setCategory('Playback')

async function playInterval(progression?: ProgressionT) {
    let interval: Interval
    switch (progression) {
        case 'ascend':
            interval = getRandomIntervalAscending()
            break;
        case 'descend':
            interval = getRandomIntervalDescending()
            break;
        case 'random': // TODO change progression name and interval gen func
            interval = getRandomIntervalAscending()
            break;

        default:
            interval = getRandomIntervalAscending()
            break;
    }
    const soundPromises = constructSoundPromises([interval.note1, interval.note2])

    const sounds = await Promise.all(soundPromises)
    for (const sound of sounds) {
        await singleSoundplayPromise(sound)
        sound.release()
    }

    // setTimeout(() => { }, 1000);


    return interval

}

async function playChord() {
    let chord = getRandomRootPositionTriad()

    const soundPromises = constructSoundPromises(chord.notes)

    const sounds = await Promise.all(soundPromises)
    await Promise.all(multiSoundplayPromise(sounds))
    for (const sound of sounds) {
        sound.release()
    }

    return chord
}

async function passivePlay({ notesMode }: SettingsDataT) {
    console.log(notesMode)
    for (let index = 0; index < 5; index++) {
        if (notesMode === 'intervals') {
            await playInterval()
        }
        else if (notesMode === 'chords') {
            await playChord()
        }
    }
}

function passivePause() {

}

function constructSoundPromises(notes: Note[]): Promise<Sound>[] {
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

// calling play will just add notes to queue
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


export { playInterval, playChord, passivePlay, passivePause }
