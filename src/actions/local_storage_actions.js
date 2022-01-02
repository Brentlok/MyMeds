import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOAD_DATA, LOAD_LOCAL_DATA, DATA_LOADED} from 'src/reducers';
import {isToday} from 'src/Utils/getDate';

const storageKey = 'MyMedsKey';

export const saveLocalData = data => async dispatch => {
  try {
    const oldData = await dispatch(readLocalData());
    const newData = {...oldData, ...data};
    const jsonValue = JSON.stringify(newData);
    await AsyncStorage.setItem(storageKey, jsonValue);
    await dispatch(loadLocalData());
  } catch (error) {
    console.log(error);
  }
};

const readLocalData = () => async dispatch => {
  try {
    const storageData = await AsyncStorage.getItem(storageKey);
    if (storageData === null) {
      await dispatch(
        saveLocalData({
          takenToday: [],
          muted: [],
          accessToken: null,
          lastCheckedDate: new Date(),
          lastCheckedTime: {hours: 0, minutes: 0},
        }),
      );
      return null;
    }
    return JSON.parse(storageData);
  } catch (error) {
    console.log(error);
  }
};

export const loadLocalData = () => async dispatch => {
  try {
    const localData = await dispatch(readLocalData());

    if (!localData) {
      return;
    }

    const {lastCheckedDate} = localData;

    if (!isToday(lastCheckedDate)) {
      //if date has changed, reload local data
      await dispatch(
        saveLocalData({takenToday: [], lastCheckedDate: new Date()}),
      );
      return;
    }

    await dispatch({
      type: LOAD_LOCAL_DATA,
      payload: {...localData},
    });
  } catch (error) {
    console.log(error);
  }
};

export const loadLocalList = () => async dispatch => {
  try {
    const {list, hoursList} = await readLocalData();
    await dispatch({
      type: LOAD_DATA,
      payload: {
        list,
        hoursList,
      },
    });

    await dispatch({
      type: DATA_LOADED,
      payload: {
        dataLoaded: 'loaded',
      },
    });
  } catch (error) {
    console.log(error);
  }
};
