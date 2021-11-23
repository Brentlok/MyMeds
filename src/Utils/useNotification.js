import {useEffect} from 'react';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  AndroidCategory,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import {Alert} from 'react-native';

const checkForBatteryPermission = async () => {
  const batteryOptimizationEnabled =
    await notifee.isBatteryOptimizationEnabled();
  if (batteryOptimizationEnabled) {
    Alert.alert(
      'Wykryto restrykcje w ustawieniach',
      'Aby zapewnić prawidłowe działanie aplikacji wyłącz optymalizacje bateri w ustawieniach telefonu',
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

const channelId = 'MyMeds_notifications';

const useNotification = () => {
  const createChannel = async () => {
    // Create a channel
    const isCreated = await notifee.isChannelCreated(channelId);
    if (!isCreated) {
      await notifee.createChannel({
        id: channelId,
        name: 'Powiadomienia',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        sound: 'mymeds_powiadomienia',
      });
    }
  };

  useEffect(() => {
    checkForBatteryPermission();
    createChannel();
  }, []);
};

export const addNotification = async (title, body) => {
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + 5000,
    // repeatFrequency: RepeatFrequency.DAILY,
  };

  await notifee.createTriggerNotification(
    {
      title,
      body,
      android: {
        channelId: channelId,
        category: AndroidCategory.REMINDER,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        sound: 'mymeds_powiadomienia',
        // autoCancel: false,
        // ongoing: true,
      },
    },
    trigger,
  );
};

notifee.onBackgroundEvent(async () => null);

export default useNotification;
