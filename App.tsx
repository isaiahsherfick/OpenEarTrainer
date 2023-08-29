import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  AppState
} from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PassiveTraining from './screens/PassiveTraining';
import ActiveTraining from './screens/ActiveTraining';
import { RootStackParamList } from './screens/RootStackPrams';
import SettingsScreen from './screens/SettingsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsData from './Settings';
import { SettingsContext } from './SettingsContext';

function App(): JSX.Element {
  const Stack = createStackNavigator<RootStackParamList>();
  const [settings, setSettings] = useState(SettingsData);
  const appState = useRef(AppState.currentState)

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

  return (
    <NavigationContainer>
      <SettingsContext.Provider value={{ settings: settings, setSettings: setSettings }}>
        <Stack.Navigator
          initialRouteName={settings.trainingMode === 'Active' ? 'ActiveTraining' : 'PassiveTraining'}
          screenOptions={{
            gestureEnabled: false,
            headerShown: false
          }}
        >
          <Stack.Screen
            name='Settings'
            component={SettingsScreen}
          />
          <Stack.Screen
            name='ActiveTraining'
            component={ActiveTraining}
            options={{
              animationEnabled: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name='PassiveTraining'
            component={PassiveTraining}
            options={{
              animationEnabled: false,
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
      </SettingsContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
