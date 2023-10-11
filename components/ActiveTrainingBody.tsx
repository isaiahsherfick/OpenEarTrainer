import { PropsWithChildren, useContext, useState } from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { SettingsContext } from "../SettingsContext"
import { ChordName, IntervalName } from "../music_theory/NoteName"

const dummyMultipleChoices = {
    options: ['Maj7', 'min7', 'p5', 'p4', 'Maj3', 'p8',],
    answer: 5
}

export function ActiveTrainingBody(props: PropsWithChildren): JSX.Element {
    const { settings, setSettings } = useContext(SettingsContext)
    const wrongAnswerPicked = () => { }
    const correctAnswerPicked = () => { }

    const IntervalCells = () => (settings.intervals.intervalsToQuiz.map((intevalName, index) => {
        return (
            <MultipleChoiceCell
                key={index}
                index={index}
                option={IntervalName[intevalName]}
                isCorrectOption={index === dummyMultipleChoices.answer}
            />
        )
    }))

    const ChordCells = () => (settings.chords.chordsToQuiz.map((chordName, index) => {
        return (
            <MultipleChoiceCell
                key={index}
                index={index}
                option={ChordName[chordName]}
                isCorrectOption={index === dummyMultipleChoices.answer}
            />
        )
    }))

    return (
        <View style={styles.ActiveTrainingBody}>
            {/* {dummyMultipleChoices.options.map((option, index) =>
                <MultipleChoiceCell
                    key={index}
                    index={index}
                    option={option}
                    isCorrectOption={index === dummyMultipleChoices.answer}
                />
            )} */}
            {settings.notesMode === 'intervals' ?
                <IntervalCells />
                :
                <ChordCells />
            }
        </View>
    )
}



type MultipleChoiceCellProps = PropsWithChildren<{
    index: number
    option: string
    isCorrectOption: boolean
    afterSelection?: () => {}
}>

function MultipleChoiceCell({ index, option, isCorrectOption }: MultipleChoiceCellProps): JSX.Element {
    const [pressed, setPressed] = useState(false)
    const checkAnswer = () => {
        if (pressed) return

        setPressed(true)
    }

    return (
        <TouchableOpacity
            key={index}
            style={[
                styles.MultipeChioceCell,
                pressed && (isCorrectOption ? styles.CorrectAnswer : styles.WrongAnswer)
            ]}
            onPress={checkAnswer}>
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