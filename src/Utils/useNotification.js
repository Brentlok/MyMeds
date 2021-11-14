import {useEffect} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';

const useNotification = () => {
  const channelId = 'my-meds-notifications';
  const channelName = 'Powiadomienia';

  const createChannel = () => {
    PushNotification.channelExists(channelId, exists => {
      if (!exists) {
        PushNotification.createChannel({
          channelId: channelId,
          channelName: channelName,
          playSound: true,
          soundName: 'default',
          importance: Importance.HIGH,
          vibrate: true,
        });
      }
    });
  };

  const getDate = () => {
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    };
  };

  const getDiff = time => {
    const {year, month, day} = getDate();
    const hours = time.slice(0, 2);
    const minutes = time.slice(3, 5);
    const now = new Date(year, month, day, hours, minutes);
    return now.getTime() - new Date().getTime();
  };

  const handleNotification = (time, itemId) => {
    // let diff = getDiff(time);
    // if (diff < 0) {
    //   diff += 86400000;
    // }
    const date = new Date(Date.now() + 1000);
    PushNotification.localNotificationSchedule({
      id: '123',
      userInfo: {id: '123'},
      channelId: channelId,
      title: 'Przypomnienie',
      message: 'pora na leki',
      date: date,
      repeatType: 'day',
      repeatTime: 1,
      soundName: 'default',
    });
  };

  useEffect(() => {
    createChannel();
  }, []);
};

export default useNotification;
