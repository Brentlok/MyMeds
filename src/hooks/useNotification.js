import {useEffect} from 'react';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  AndroidCategory,
  TriggerType,
  RepeatFrequency,
  AndroidStyle,
} from '@notifee/react-native';
import {useSelector} from 'react-redux';
import store from 'src/store';
import {addTakenToday} from '../actions';

const channelId = 'MyMeds_notifications';
const {dispatch} = store;

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
  const notificationsList = (await notifee.getTriggerNotifications()).map(
    ({notification}) => ({
      hour: notification.title.slice(9, 11),
      id: notification.id,
    }),
  );

  const hourList = list.map(({hour}) => hour);

  hourList.forEach(newHour => {
    if (notificationsList.map(({hour}) => hour).includes(newHour)) {
      return;
    }
    const listToDisplay = list
      .filter(({hour}) => hour === newHour)[0]
      .list.map(({name}) => name);
    addNotification(
      `<b>Jest już ${newHour}:00 sprawdź co powinieneś zażyć...</b>`,
      listToDisplay,
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

const addNotification = async (title, list, hour) => {
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
        largeIcon: require('../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png'),
        style: {
          type: AndroidStyle.INBOX,
          lines: list,
        },
        actions: [
          {
            title: '✅ Przyjąłem',
            pressAction: {id: 'taken'},
          },
          {
            title: '❌ Anuluj',
            pressAction: {id: 'cancel'},
          },
        ],
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

const handleEvent = async notification => {
  if (!notification.detail.pressAction) {
    return;
  }
  const notificationId = notification.detail.notification.id;
  const {id} = notification.detail.pressAction;
  const hour = notification.detail.notification.title.slice(9, 11);
  if (id !== 'default') {
    if (id === 'taken') {
      await dispatch(addTakenToday(hour));
    }
    await notifee.cancelDisplayedNotification(notificationId);
  }
};

notifee.onForegroundEvent(handleEvent);
notifee.onBackgroundEvent(handleEvent);

export default useNotification;
