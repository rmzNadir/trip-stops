import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import { Provider } from 'react-redux';
import { colorModeManager } from './src/app/colorModeManager';
import { extendedTheme } from './src/app/extendedTheme';
import { store } from './src/app/store';
import Routes from './src/routes';
import 'react-native-gesture-handler';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = () => {
  return (
    <NativeBaseProvider
      theme={extendedTheme}
      colorModeManager={colorModeManager}>
      <Provider store={store}>
        <Box
          safeArea
          flex={1}
          _dark={{ bg: 'muted.900' }}
          _light={{ bg: 'muted.50' }}>
          <Routes />
        </Box>
      </Provider>
    </NativeBaseProvider>
  );
};
export default App;
