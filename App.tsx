import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Box } from 'native-base';
import { Provider } from 'react-redux';
import { colorModeManager } from './src/app/colorModeManager';
import { extendedTheme } from './src/app/extendedTheme';
import { store } from './src/app/store';
import Routes from './src/routes';

const App = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};
export default App;
