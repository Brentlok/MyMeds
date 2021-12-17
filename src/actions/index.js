import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOAD_DATA,
  LOAD_LOCAL_DATA,
  CHANGE_MODAL_TAKEN_OPEN,
  DATA_LOADED,
  REMOVE_ITEM,
  LOGIN,
} from 'src/reducers';

export const login = (email, password) => async dispatch => {
  try {
    const {data} = await axios.post('http://51.38.131.160:8080/api/login', {
      email,
      password,
    });
    dispatch(saveLocalData({accessToken: data.access_token}));
    dispatch({
      type: LOGIN,
      payload: {
        accessToken: data.access_token,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const API_URL = 'https://run.mocky.io/v3/595fca50-7f9e-4c5c-96f9-48fca2a5dfa1';

export const loadData = () => async dispatch => {
  try {
    const response = await axios.get(API_URL);
    const list = response.data.list.sort(
      (a, b) => parseInt(a.time.hours, 10) > parseInt(b.time.hours, 10),
    );
    dispatch({
      type: LOAD_DATA,
      payload: {
        list,
      },
    });
    dispatch({
      type: DATA_LOADED,
      payload: {
        dataLoaded: 'loaded',
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DATA_LOADED,
      payload: {
        dataLoaded: 'error',
      },
    });
  }
};

const storageKey = 'testingKey';

export const saveLocalData = data => async () => {
  try {
    const oldData = await readLocalData();
    const jsonValue = JSON.stringify({...oldData, ...data});
    console.log(data);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (err) {
    console.log(err);
  }
};

const readLocalData = async () => {
  try {
    const storageData = await AsyncStorage.getItem(storageKey);
    if (storageData === null) {
      //if there is no saved data localy just return this object with some default values
      return {batteryOptimizationChecked: false, accessToken: null};
    }
    return JSON.parse(storageData);
  } catch (err) {
    console.log(err);
  }
};

export const loadLocalData = () => async dispatch => {
  try {
    const {batteryOptimizationChecked, accessToken} = await readLocalData();
    dispatch({
      type: LOAD_LOCAL_DATA,
      payload: {
        batteryOptimizationChecked,
        accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const changeModalTakenOpen = () => ({type: CHANGE_MODAL_TAKEN_OPEN});

export const removeItem = () => ({type: REMOVE_ITEM});
