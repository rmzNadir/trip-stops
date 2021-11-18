import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageManager, ColorMode } from 'native-base';

// Make selected theme persist through app reloads
export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      const val = await AsyncStorage.getItem('@color-mode');

      if (val) {
        return val === 'dark' ? 'dark' : 'light';
      }

      return 'dark';
    } catch (e) {
      return 'dark';
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
