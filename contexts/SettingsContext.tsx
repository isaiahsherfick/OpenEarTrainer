import React, { PropsWithChildren, SetStateAction, createContext, useEffect, useRef, useState } from "react";
import SettingsData from "../Settings";
import { SettingsDataT } from "../screens/RootStackPrams";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from 'react-native';

export const SettingsContext = createContext({
    settings: SettingsData,
    setSettings: (updatedSettings: SetStateAction<SettingsDataT>) => { }
})

export const SettingsProvider = ({ children }: PropsWithChildren) => {
    const [settings, setSettings] = useState(SettingsData);
    const appState = useRef(AppState.currentState)

    // initialization
    useEffect(() => {
        loadStoredSettings().then()
    }, [])

    // save user settings to storage when the app goes inactive
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current != nextAppState && appState.current === 'active') {
                console.log('saving settings...', settings)
                AsyncStorage.setItem('OpenEarTrainerSettings', JSON.stringify(settings))
                    .then(() => {
                        // console.log('settings saved')
                    })
                    .catch((e => {
                        console.log('error saving settings', e)
                    }))
            }

            appState.current = nextAppState
        })

        return () => {
            subscription.remove();
        };
    }, [settings]) // side effect dependent on settings state changes

    const loadStoredSettings = async () => {
        try {
            const jsonString = await AsyncStorage.getItem('OpenEarTrainerSettings');
            if (!jsonString) { // first time app use
                // TODO add welcome screen to navigator

                AsyncStorage.setItem('OpenEarTrainerSettings', JSON.stringify(SettingsData))
            }
            else {
                console.log('welcome back')
                setSettings(JSON.parse(jsonString))
            }

            return jsonString
        } catch (e) {
            // error reading value
            console.log('error checking for first time use', e)
        }
    };

    return (
        <SettingsContext.Provider value={{
            settings,
            setSettings
        }}>
            {children}
        </SettingsContext.Provider>
    )
}