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
  const {list} = useSelector(state => state);

  useEffect(() => {
    createChannel();
  }, []);

  useEffect(() => {
    checkNotifications(Object.keys(list));
  }, [list]);
};

const checkNotifications = async list => {
  const notificationsList = await (
    await notifee.getTriggerNotifications()
  ).map(({notification}) => notification.body.slice(5, 7));

  list.forEach(item => {
    if (notificationsList.includes(item)) {
      return;
    }
    addNotification(
      'Już czas coś zażyć!',
      `Jest ${item}:00 sprawdź co powinieneś zażyć...`,
      item,
    );
  });
};

const getTime = hour => {
  const date = new Date();

  const hourDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    parseInt(hour, 10) + 1,
  );
  return parseInt(hour, 10) + 1 < date.getHours() //if hour is less than actual hour set notification tomorrow
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
