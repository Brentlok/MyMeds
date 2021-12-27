import notifee from '@notifee/react-native';
import {Alert} from 'react-native';

export const checkForBatteryPermission = async () => {
  await notifee.openBatteryOptimizationSettings();
};

export const checkPowerManager = async () => {
  const powerManagerInfo = await notifee.getPowerManagerInfo();
  if (powerManagerInfo.activity) {
    async () => await notifee.openPowerManagerSettings();
  } else {
    Alert.alert('Nie znaleziono ustawienia...', '', [
      {
        text: 'OK',
        style: 'cancel',
      },
    ]);
  }
};
