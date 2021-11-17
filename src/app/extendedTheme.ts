import { extendTheme } from 'native-base';

export const extendedTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
  colors: {
    primary: {
      50: '#e2fdeb',
      100: '#bef0d1',
      200: '#98e5b5',
      300: '#71d998',
      400: '#4bce7c',
      500: '#31b462',
      600: '#238c4b',
      700: '#166436',
      800: '#083d1f',
      900: '#001605',
    },
    secondary: {
      50: '#d9fdff',
      100: '#aff2fd',
      200: '#83e8f7',
      300: '#55def3',
      400: '#2ad5ef',
      500: '#10bbd5',
      600: '#0091a7',
      700: '#006977',
      800: '#003f4a',
      900: '#00171d',
    },
  },
});
