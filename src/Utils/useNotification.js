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
  const {list, dataLoaded, takenToday} = useSelector(state => state);

  useEffect(() => {
    createChannel();
  }, []);

  useEffect(() => {
    if (dataLoaded === 'loaded') {
      checkNotifications(list.filter(({hour}) => !takenToday.includes(hour)));
    }
  }, [list, dataLoaded, takenToday]);
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
    notifee.cancelTriggerNotification(id);
  });
};

const getTime = hour => {
  const date = new Date();

  const hourDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    parseInt(hour, 10),
  );
  return hourDate.getTime() < Date.now()
    ? hourDate.getTime() + 86400000
    : hourDate.getTime();
};

const addNotification = async (title, body, hour) => {
  const hourTime = getTime(hour);

  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: hourTime,
    repeatFrequency: RepeatFrequency.DAILY,
  };

  await notifee.createTriggerNotification(
    {
      title,
      body,
      android: {
        id: hour,
        channelId: channelId,
        category: AndroidCategory.REMINDER,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        sound: 'mymeds_powiadomienia',
        autoCancel: false,
        ongoing: true,
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

notifee.onBackgroundEvent(async () => null);

export default useNotification;
