import {useEffect} from 'react';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  AndroidCategory,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';

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
