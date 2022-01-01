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
    notifee.cancelDisplayedNotification(id);
    notifee.cancelTriggerNotification(id);
  });
};

export const displayNotification = async (title, body) => {
  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: channelId,
      category: AndroidCategory.ALARM,
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      autoCancel: true,
      timeoutAfter: 1000,
    },
  });
};

const addNotification = async (title, body, hour) => {
  const date = new Date(Date.now());
  date.setHours(hour);
  date.setMinutes(0);
  date.setSeconds(0);
  const time =
    date.getTime() < Date.now() ? date.getTime() + 86400000 : date.getTime();
  //to be sure that timestamp is in the future

  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: time,
    repeatFrequency: RepeatFrequency.DAILY,
    alarmManager: true,
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
        autoCancel: true,
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

notifee.onBackgroundEvent(async notification => {
  console.log(notification);
});

export default useNotification;
