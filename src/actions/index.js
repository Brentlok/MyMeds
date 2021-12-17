import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOAD_DATA,
  LOAD_LOCAL_DATA,
  CHANGE_MODAL_TAKEN_OPEN,
  DATA_LOADED,
  REMOVE_ITEM,
  LOGIN,
  CHANGE_PATH,
} from 'src/reducers';
import store from 'src/store';

const API_URL = 'http://51.38.131.160:8080/api/';

export const register = async (email, password, name) => {
  try {
    await axios.post(`${API_URL}register`, {
      email,
      password,
      name,
    });
  } catch (error) {
    alert(JSON.stringify(error));
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const {data} = await axios.post(`${API_URL}login`, {
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
    dispatch(changePath('/home'));
  } catch (error) {
    alert(JSON.stringify(error));
  }
};

export const createMed =
  (name, quantity, quantity_type, hour) => async dispatch => {
    const {accessToken} = store.getState();
    try {
      await axios.post(
        `${API_URL}meds`,
        {
          name,
          quantity,
          quantity_type,
          taking_date: `01.01.2000 ${hour}`,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      dispatch(loadData());
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

export const loadData = () => async dispatch => {
  try {
    const {accessToken} = store.getState();
    const {
      data: {list},
    } = await axios.get(`${API_URL}meds/01.01.2000`, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });

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
    const newData = {...oldData, ...data};
    const jsonValue = JSON.stringify(newData);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

export const changeModalTakenOpen = () => ({type: CHANGE_MODAL_TAKEN_OPEN});

export const removeItem = () => ({type: REMOVE_ITEM});

const changePath = newPath => ({type: CHANGE_PATH, payload: {newPath}});
