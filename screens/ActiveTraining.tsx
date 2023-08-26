import React, { useContext } from 'react';
import type { PropsWithChildren } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import PlaybackControl from '../components/PlaybackControl';
import { RootStackParamList } from './RootStackPrams';
import { globalStyles } from '../styles';
import { SettingsContext } from '../SettingsContext';

type ActiveTrainingProp = StackScreenProps<RootStackParamList, 'ActiveTraining'>

export default function ActiveTraining({ route, navigation }: ActiveTrainingProp): JSX.Element {
    const { settings } = useContext(SettingsContext)
    return (
        <SafeAreaView style={globalStyles.container}>
            <Button
                title='to passive'
                onPress={() => navigation.navigate('PassiveTraining')}
            />
            <View style={styles.TrainingScreen}>
                <ScreenHeader
                    TrainingMode='Active'
                    NotesMode={settings.notesMode}
                    Navigation={navigation}
                />
                <ActiveTrainingBody />
                <PlaybackControl
                    TrainingMode='Active'
                />
            </View>
        </SafeAreaView>
    )
}

function ActiveTrainingBody(props: PropsWithChildren): JSX.Element {

    return (
        <View>
            <Text>
                I'm the body of the Active Training View
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    TrainingScreen: {
        height: '90%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})