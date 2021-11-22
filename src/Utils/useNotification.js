import {useEffect} from 'react';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';

const channelId = 'MyMeds-notifications';

const useNotification = () => {
  const createChannel = async () => {
    //delete older channels if any exists
    await (
      await notifee.getChannels()
    ).forEach(({id}) => {
      notifee.deleteChannel(id);
    });
    // Create a channel
    const isCreated = await notifee.isChannelCreated(channelId);
    if (!isCreated) {
      await notifee.createChannel({
        id: channelId,
        name: 'Powiadomienia MyMeds',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        sound: 'default',
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
    timestamp: Date.now() + 2000,
    // repeatFrequency: RepeatFrequency.DAILY,
  };

  await notifee.createTriggerNotification(
    {
      title,
      body,
      android: {
        channelId: channelId,
      },
    },
    trigger,
  );
};

export default useNotification;
