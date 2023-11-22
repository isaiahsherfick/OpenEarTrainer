import { PropsWithChildren, useContext, useEffect, useState } from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { SettingsContext } from "../contexts/SettingsContext"
import { ChordName, IntervalName } from "../music_theory/NoteName"
import { SoundEngineContext } from "../contexts/SoundEngineContext"
import { Chord } from "../music_theory/Chord"
import { Interval } from "../music_theory/Interval"

type ActiveTrainingBodyProps = {
    trainingInfo: Object
}

export function ActiveTrainingBody({ trainingInfo }: PropsWithChildren<ActiveTrainingBodyProps>): JSX.Element {
    const { settings } = useContext(SettingsContext)
    const { currentChordOrIntervalRef, playNext, replay } = useContext(SoundEngineContext)
    const [correctAnswer, setCorrectAnswer] = useState(-1)
    const [answersSelected, setAnswersSelected] = useState<number[]>([])

    useEffect(() => {
        calcCorrectAnswer()
        clearCells()
    }, [trainingInfo, settings])

    const clearCells = () => {
        setAnswersSelected([])
    }

    const calcCorrectAnswer = () => {
        if (currentChordOrIntervalRef?.current instanceof Chord) {
            setCorrectAnswer(currentChordOrIntervalRef.current.quality)
        }
        else if (currentChordOrIntervalRef?.current instanceof Interval) {
            setCorrectAnswer(currentChordOrIntervalRef.current.numHalfSteps)
        }
    }

    const answerPicked = (index: number) => {
        // if wrong answer
        setAnswersSelected([...answersSelected, index])
        if (index === correctAnswer) {
            setTimeout(() => {
                clearCells()
                playNext().then(() => {
                    calcCorrectAnswer()
                })
            }, 400);
        }
        else {
            replay()
        }
    }

    return (
        <View style={styles.ActiveTrainingBody}>
            {settings.notesMode === 'intervals' ?
                settings.intervals.intervalsToQuiz.map((intevalName, index) =>
                    <MultipleChoiceCell
                        key={index}
                        index={intevalName}
                        option={IntervalName[intevalName]}
                        isCorrectAnswer={intevalName === correctAnswer}
                        selected={answersSelected.includes(intevalName)}
                        answerPicked={answerPicked}
                    />
                )
                :
                settings.chords.chordsToQuiz.map((chordName, index) =>
                    <MultipleChoiceCell
                        key={index}
                        index={chordName}
                        option={ChordName[chordName]}
                        isCorrectAnswer={chordName === correctAnswer}
                        selected={answersSelected.includes(chordName)}
                        answerPicked={answerPicked}
                    />)
            }
        </View>
    )
}



type MultipleChoiceCellProps = PropsWithChildren<{
    index: number
    option: string
    isCorrectAnswer: boolean
    selected: boolean
    answerPicked: (index: number) => void
}>

function MultipleChoiceCell({ index, option, isCorrectAnswer, selected, answerPicked }: MultipleChoiceCellProps): JSX.Element {
    return (
        <TouchableOpacity
            // key={index}
            style={[
                styles.MultipeChioceCell,
                selected &&
                (isCorrectAnswer ? styles.CorrectAnswer : styles.WrongAnswer)
            ]}
            onPress={() => { answerPicked(index) }}>
            <Text style={styles.MultipeChioceCellText}>
                {option}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ActiveTrainingBody: {
        paddingVertical: 10,
        // flex: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    },
    MultipeChioceCell: {
        width: '48%',
        // flexGrow: 1,
        padding: 15,
        borderWidth: .3,
        borderColor: '#aaaaaa',
    },
    MultipeChioceCellText: {
        fontSize: 20,
        textAlign: 'center'
    },
    WrongAnswer: {
        borderColor: '#ffffff00',
        backgroundColor: 'lightcoral',
        opacity: .3
    },
    CorrectAnswer: {
        borderColor: '#ffffff00',
        backgroundColor: 'mediumaquamarine',
    },
})