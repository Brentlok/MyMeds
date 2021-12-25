import {useEffect} from 'react';
import notifee from '@notifee/react-native';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {loadLocalData, saveLocalData} from 'src/actions';
import {useLocation} from 'react-router-native';

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

const checkPowerManager = async () => {
  const powerManagerInfo = await notifee.getPowerManagerInfo();
  if (powerManagerInfo.activity) {
    Alert.alert(
      'Wykryto restrykcje w ustawieniach',
      'Aby zapewnić prawidłowe działanie aplikacji wyłącz power manager dla tej aplikacji w ustawieniach telefonu',
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

const checkSettings = async () => {
  await checkForBatteryPermission();
  await checkPowerManager();
};

const useBattery = () => {
  const {pathname} = useLocation();
  const {localDataLoaded, batteryOptimizationChecked} = useSelector(
    state => state,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localDataLoaded) {
      //load local data
      dispatch(loadLocalData());
    }
    if (
      localDataLoaded &&
      !batteryOptimizationChecked &&
      !/start/.test(pathname) &&
      pathname !== '/'
    ) {
      checkSettings();
      dispatch(saveLocalData({batteryOptimizationChecked: true}));
    }
  }, [batteryOptimizationChecked, dispatch, localDataLoaded, pathname]);
};

export default useBattery;
