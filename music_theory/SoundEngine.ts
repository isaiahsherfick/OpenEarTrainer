import Sound from 'react-native-sound'

Sound.setCategory('Playback')


const notes: Sound[] = []




function soundFactory() {

    const C4 = new Sound('C4piano.mp3', Sound.MAIN_BUNDLE, (err) => {
        if (err) {
            console.log('error loading the sound file', err)
            return
        }
    })

    notes.push(C4)

}

function playNotes() {
    notes.forEach(note => {
        note.play()
    });
}

function pausePlayback() {

}


export { soundFactory, playNotes, pausePlayback }
