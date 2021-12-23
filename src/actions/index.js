import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOAD_DATA,
  LOAD_LOCAL_DATA,
  CHANGE_MODAL_TAKEN_OPEN,
  DATA_LOADED,
  LOGIN,
  CHANGE_PATH,
  ADD_TAKEN_TODAY,
} from 'src/reducers';
import store from 'src/store';
import {isToday} from 'src/Utils/getDate';

const API_URL = 'http://51.38.131.160:8080/api/';

export const register = (email, password, name) => async dispatch => {
  try {
    const {status} = await axios.post(`${API_URL}register`, {
      email,
      password,
      name,
    });
    return status;
  } catch (error) {
    return error;
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const {data, status} = await axios.post(`${API_URL}login`, {
      email,
      password,
    });
    if (status !== 200) {
      return status;
    }
    if (data.message === 'Invalid Credentials') {
      return 'Podałeś niepoprawne dane';
    }
    dispatch(saveLocalData({accessToken: data.access_token}));
    dispatch({
      type: LOGIN,
      payload: {
        accessToken: data.access_token,
      },
    });
    dispatch(changePath('/home'));
    dispatch(loadData(data.access_token));
  } catch (error) {
    return error;
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
          taking_date: `01.01.2000 ${hour}:00`,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      dispatch(loadData());
      return 'Dodano pomyślnie!';
    } catch (error) {
      return error.message;
    }
  };

export const loadData =
  (accessToken = store.getState().accessToken) =>
  async dispatch => {
    try {
      const {
        data: {list},
      } = await axios.get(`${API_URL}meds/01.01.2000`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });

      const hours = Object.keys(list);
      const items = Object.keys(list).map(item => list[item]);
      const proccessedList = hours.map((hour, index) => ({
        hour,
        list: items[index],
      }));

      dispatch({
        type: LOAD_DATA,
        payload: {
          list: proccessedList,
          hourList: hours,
        },
      });
      dispatch({
        type: DATA_LOADED,
        payload: {
          dataLoaded: 'loaded',
        },
      });
    } catch (error) {
      if (error.message.includes(403)) {
        dispatch({
          type: DATA_LOADED,
          payload: {
            dataLoaded: 'not_verified',
          },
        });
        return;
      }
      dispatch({
        type: DATA_LOADED,
        payload: {
          dataLoaded: 'error',
        },
      });
    }
  };

const storageKey = 'testingKey';

export const saveLocalData = data => async dispatch => {
  console.log(data);
  try {
    const oldData = await readLocalData();
    const newData = {...oldData, ...data};
    const jsonValue = JSON.stringify(newData);
    await AsyncStorage.setItem(storageKey, jsonValue);
    dispatch(loadLocalData());
  } catch (error) {
    console.log(error);
  }
};

const readLocalData = async () => {
  try {
    const storageData = await AsyncStorage.getItem(storageKey);
    if (storageData === null) {
      //if there is no saved data localy just return this object with some default values
      return {batteryOptimizationChecked: false};
    }
    return JSON.parse(storageData);
  } catch (error) {
    console.log(error);
  }
};

export const loadLocalData = () => async dispatch => {
  try {
    const {
      batteryOptimizationChecked,
      accessToken,
      takenToday,
      takenTodayDate,
      muted,
    } = await readLocalData();
    if (!takenToday && !takenTodayDate) {
      dispatch(saveLocalData({takenToday: [], takenTodayDate: new Date()}));
    }
    if (!isToday(takenTodayDate)) {
      dispatch(saveLocalData({takenToday: [], takenTodayDate: new Date()}));
    }
    if (!muted) {
      dispatch(saveLocalData({muted: []}));
    }
    dispatch({
      type: LOAD_LOCAL_DATA,
      payload: {
        batteryOptimizationChecked,
        accessToken,
        takenToday,
        muted,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const changeModalTakenOpen = (type, item) => ({
  type: CHANGE_MODAL_TAKEN_OPEN,
  payload: {
    modalText:
      type === 'close'
        ? null
        : type === 'taken'
        ? 'Czy już przyjąłeś?'
        : 'Czy chcesz to usunąć?',
    itemToRemove: item,
  },
});

export const addTakenToday = () => async dispatch => {
  const {list, takenToday} = await store.getState();
  const newTakenToday = [...takenToday, list[takenToday.length].hour];
  await dispatch(saveLocalData({takenToday: newTakenToday}));
  await dispatch({
    type: ADD_TAKEN_TODAY,
    payload: {newTakenToday},
  });
};

export const removeItem = itemId => async dispatch => {
  try {
    const {accessToken} = await store.getState();
    const {status} = await axios.delete(`${API_URL}meds/${itemId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (status === 200) {
      dispatch(loadData());
    }
    dispatch(changeModalTakenOpen('close'));
  } catch (error) {
    console.error(error);
  }
};

export const mute = hour => async dispatch => {
  try {
    const {muted} = await store.getState();
    let newMuted;
    if (muted.includes(hour)) {
      newMuted = muted.filter(mutedHour => mutedHour !== hour);
    } else {
      newMuted = [...muted, hour];
    }
    newMuted.sort((a, b) => a > b);
    await dispatch(saveLocalData({muted: newMuted}));
  } catch (error) {
    console.log(error);
  }
};

const changePath = newPath => ({type: CHANGE_PATH, payload: {newPath}});
