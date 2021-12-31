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
  ADD_TOMORROW,
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
    await dispatch(saveLocalData({accessToken: data.access_token}));
    await dispatch({
      type: LOGIN,
      payload: {
        accessToken: data.access_token,
      },
    });
    await dispatch(changePath('/home'));
    await dispatch(loadData(data.access_token));
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
      await dispatch(loadData());
      const hourNow = new Date().getHours();
      if (hour <= hourNow) {
        await dispatch({
          type: ADD_TOMORROW,
          payload: {addedForTomorrow: hour.toString()},
        });
        await dispatch(addTakenToday(hour.toString()));
      }
      return 'success';
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

      await dispatch({
        type: LOAD_DATA,
        payload: {
          list: proccessedList,
          hourList: hours,
        },
      });
      await dispatch({
        type: DATA_LOADED,
        payload: {
          dataLoaded: 'loaded',
        },
      });
    } catch (error) {
      if (error.message.includes(403)) {
        await dispatch({
          type: DATA_LOADED,
          payload: {
            dataLoaded: 'not_verified',
          },
        });
        return;
      }
      await dispatch({
        type: DATA_LOADED,
        payload: {
          dataLoaded: 'error',
        },
      });
    }
  };

const storageKey = 'testingKey';

export const saveLocalData = data => async dispatch => {
  try {
    const oldData = await readLocalData();
    const newData = {...oldData, ...data};
    const jsonValue = JSON.stringify(newData);
    await AsyncStorage.setItem(storageKey, jsonValue);
    await dispatch(loadLocalData());
  } catch (error) {
    console.log(error);
  }
};

const readLocalData = async () => {
  try {
    const storageData = await AsyncStorage.getItem(storageKey);
    if (storageData === null) {
      return {};
    }
    return JSON.parse(storageData);
  } catch (error) {
    console.log(error);
  }
};

export const loadLocalData = () => async dispatch => {
  try {
    const {accessToken, takenToday, takenTodayDate, muted} =
      await readLocalData();
    if (!takenToday && !takenTodayDate) {
      await dispatch(
        saveLocalData({takenToday: [], takenTodayDate: new Date()}),
      );
    }
    if (!isToday(takenTodayDate)) {
      await dispatch(
        saveLocalData({takenToday: [], takenTodayDate: new Date()}),
      );
      //if date has changed, reload local data
      await dispatch(loadLocalData());
      return;
    }
    if (!muted) {
      await dispatch(saveLocalData({muted: []}));
    }
    await dispatch({
      type: LOAD_LOCAL_DATA,
      payload: {
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

export const addTakenToday = hour => async dispatch => {
  const {list, takenToday} = await store.getState();

  if (hour && takenToday.includes(hour)) {
    return;
  }

  if (!hour) {
    hour = list[takenToday.length].hour;
  }

  const newTakenToday = [...takenToday, hour];
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
      await dispatch(loadData());
    }
    await dispatch(changeModalTakenOpen('close'));
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
