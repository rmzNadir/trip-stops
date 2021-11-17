import React from 'react';
import { Box } from 'native-base';
import ToggleDarkMode from './ToggleDarkMode';

const Settings = () => {
  return (
    <Box flex='1' _dark={{ bg: 'muted.900' }} _light={{ bg: 'muted.50' }}>
      <ToggleDarkMode />
    </Box>
  );
};

export default Settings;
