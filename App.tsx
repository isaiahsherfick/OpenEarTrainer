import React from 'react';
import 'react-native-gesture-handler';
import { SettingsProvider } from './contexts/SettingsContext';
import { SoundEngineProvider } from './contexts/SoundEngineContext';
import ScreensWrapper from './screens/ScreensWrapper';

function App(): JSX.Element {
  console.log('app - re-rendered')

  return (
    <SettingsProvider>
      <SoundEngineProvider>
        <ScreensWrapper />
      </SoundEngineProvider>
    </SettingsProvider>

  );
}

export default App;
