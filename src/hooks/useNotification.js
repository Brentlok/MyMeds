import {useEffect} from 'react';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  AndroidCategory,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import {useSelector} from 'react-redux';

const channelId = 'MyMeds_notifications';

const useNotification = () => {
  const {list, dataLoaded, muted} = useSelector(state => state);

  useEffect(() => {
    createChannel();
  }, []);

  useEffect(() => {
    if (dataLoaded === 'loaded') {
      checkNotifications(list.filter(({hour}) => !muted.includes(hour)));
    }
  }, [list, dataLoaded, muted]);
};

const checkNotifications = async list => {
  const notificationsList = await (
    await notifee.getTriggerNotifications()
  ).map(({notification}) => ({
    hour: notification.body.slice(5, 7),
    id: notification.id,
  }));

  const hourList = list.map(({hour}) => hour);

  hourList.forEach(newHour => {
    if (notificationsList.map(({hour}) => hour).includes(newHour)) {
      return;
    }
    addNotification(
      'Już czas coś zażyć!',
      `Jest ${newHour}:00 sprawdź co powinieneś zażyć...`,
      newHour,
    );
  });

  notificationsList.forEach(({hour, id}) => {
    if (hourList.includes(hour)) {
      return;
    }
    notifee.cancelDisplayedNotifications();
    notifee.cancelTriggerNotification(id);
  });
};

const addNotification = async (title, body, hour) => {
  const date = new Date(Date.now());
  date.setHours(hour);

  const time =
    date.getTime() < Date.now() ? date.getTime() + 86400000 : date.getTime();
  //to be sure that timestamp is in the future

  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: time,
    repeatFrequency: RepeatFrequency.DAILY,
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
        autoCancel: false,
        ongoing: true,
        pressAction: {
          id: 'default',
        },
      },
    },
    trigger,
  );
};

const createChannel = async () => {
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

export default useNotification;
