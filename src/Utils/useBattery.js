import {useEffect} from 'react';
import notifee from '@notifee/react-native';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {loadLocalData, saveLocalData} from 'src/actions';

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

const useBattery = () => {
  const {localDataLoaded, batteryOptimizationChecked} = useSelector(
    state => state,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localDataLoaded) {
      //load local data
      dispatch(loadLocalData());
    }
    if (localDataLoaded && !batteryOptimizationChecked) {
      checkForBatteryPermission();
      dispatch(saveLocalData({batteryOptimizationChecked: true}));
    }
  }, [batteryOptimizationChecked, dispatch, localDataLoaded]);
};

export default useBattery;
