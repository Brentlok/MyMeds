import notifee from '@notifee/react-native';
import {Alert} from 'react-native';

export const checkForBatteryPermission = async () => {
  const batteryOptimizationEnabled =
    await notifee.isBatteryOptimizationEnabled();
  if (batteryOptimizationEnabled) {
    Alert.alert(
      'Czy chcesz otworzyć ustawienia optymalizacji bateri?',
      '',
      [
        {
          text: 'Otwórz ustawienia',
          onPress: async () => await notifee.openBatteryOptimizationSettings(),
        },
        {
          text: 'Anuluj',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
};

export const checkPowerManager = async () => {
  const powerManagerInfo = await notifee.getPowerManagerInfo();
  if (powerManagerInfo.activity) {
    Alert.alert(
      'Czy chcesz otworzyć ustawienia power manager?',
      '',
      [
        {
          text: 'Otwórz ustawienia',
          onPress: async () => await notifee.openPowerManagerSettings(),
        },
        {
          text: 'Anuluj',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
};
