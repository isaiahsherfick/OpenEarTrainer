import React, { createContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  AppState
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PassiveTraining from './screens/PassiveTraining';
import ActiveTraining from './screens/ActiveTraining';
import { NotesMode, RootStackParamList, TrainingMode } from './screens/RootStackPrams';
import SettingsScreen from './screens/SettingsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsData from './Settings';
import { SettingsContext } from './SettingsContext';

function App(): JSX.Element {
  const Stack = createStackNavigator<RootStackParamList>();
  const [settings, setSettings] = useState(SettingsData)

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
    } catch (e) {
      // error reading value
      console.log('error checking for first time use', e)
    }
  };

  useEffect(() => {
    loadStoredSettings().then()
  }, [])

  return (
    <NavigationContainer>
      <SettingsContext.Provider value={{ settings: settings, setSettings: setSettings }}>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            headerShown: false
          }}
        >
          {settings.trainingMode === 'Active' &&
            <Stack.Screen
              name='ActiveTraining'
              component={ActiveTraining}
            />
          }
          <Stack.Screen
            name='PassiveTraining'
            component={PassiveTraining}
          />
          {settings.trainingMode !== 'Active' &&
            <Stack.Screen
              name='ActiveTraining'
              component={ActiveTraining}
            />
          }
          <Stack.Screen
            name='Settings'
            component={SettingsScreen}
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
