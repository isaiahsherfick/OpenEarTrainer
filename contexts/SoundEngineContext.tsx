import { PropsWithChildren, createContext } from "react"
import useSoundEngine from "../hooks/useSoundEngine"
import { Interval } from "../music_theory/Interval"
import { Note } from "../music_theory/Note"
import { NoteName } from "../music_theory/NoteName"
import { Chord } from "../music_theory/Chord"
import { debugNotes } from "../util"

type SoundEngineContextT = {
    currentChordOrIntervalRef: React.MutableRefObject<Chord | Interval | undefined> | undefined,
    playNext: () => Promise<void>,
    playPassive: () => void,
    pausePassive: () => void,
    replay: () => Promise<void>
    // passive: () => () => void
}

export const SoundEngineContext = createContext<SoundEngineContextT>({
    currentChordOrIntervalRef: undefined,
    playNext: () => new Promise<void>(() => { }),
    playPassive: () => { },
    pausePassive: () => { },
    replay: () => new Promise<void>(() => { }),
    // passive: () => (() => { })
})

export const SoundEngineProvider = ({ children }: PropsWithChildren) => {
    const SE = useSoundEngine()
    console.log('SEC - rerendered', SE.currentChordOrIntervalRef.current)
    return (
        <SoundEngineContext.Provider value={SE}>
            {children}
        </SoundEngineContext.Provider>
    )
}