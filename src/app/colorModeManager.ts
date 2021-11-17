import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageManager, ColorMode } from 'native-base';

// Make selected theme persist through app reloads
export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      const val = await AsyncStorage.getItem('@color-mode');

      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      if (typeof value === 'string') {
        await AsyncStorage.setItem('@color-mode', value);
      } else {
        throw 'Unsupported color mode';
      }
    } catch (e) {
      // console.error(e);
    }
  },
};
