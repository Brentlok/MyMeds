import axios from 'axios';
import store from 'src/store';
import {LOAD_DATA, DATA_LOADED, LOGIN, ADD_TOMORROW} from 'src/reducers';
import {getNow} from 'src/Utils/getDate';
import {changePath, addTakenToday, changeModalTakenOpen} from '.';
import {saveLocalData, loadLocalList} from './local_storage_actions';
const API_URL = 'http://51.38.131.160:8400/api/';
const SUGGESTION_API_URL = 'http://54.37.138.225:3000/';

export const register = name => async dispatch => {
  const {mail, password} = await store.getState();
  try {
    const {status} = await axios.post(`${API_URL}register`, {
      email: mail,
      password,
      name,
    });
    setTimeout(() => {
      dispatch(changePath('/start/start'));
    }, 1000);
    return status;
  } catch (error) {
    return error;
  }
};

export const login = (email, password) => async dispatch => {
  console.log('login');
  try {
    const {
      data: {data},
      status,
    } = await axios.post(`${API_URL}login`, {
      email,
      password,
    });
    if (status !== 200) {
      return status;
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
    return error.message.slice(-3);
  }
};

export const createMed = async (name, quantity, quantity_type, hour) => {
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
    return 'success';
  } catch (error) {
    return error.message;
  }
};

export const loadNewMeds = hour => async dispatch => {
  await dispatch(loadData());
  const hourNow = new Date().getHours();
  if (hour <= hourNow) {
    await dispatch({
      type: ADD_TOMORROW,
      payload: {addedForTomorrow: hour.toString()},
    });
    await dispatch(addTakenToday(hour.toString()));
  }
};

export const loadData =
  (accessToken = store.getState().accessToken) =>
  async dispatch => {
    try {
      const {
        data: {
          data: {list},
        },
      } = await axios.get(`${API_URL}meds/01.01.2000`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });

      const hours = Object.keys(list);
      const items = Object.keys(list).map(item => list[item]);
      const proccessedList = hours.map((hour, index) => ({
        hour,
        list: items[index],
      }));

      const lastCheckedTime = getNow();

      //save loaded data to local storage
      await dispatch(
        saveLocalData({
          list: proccessedList,
          hourList: hours,
          lastCheckedTime,
        }),
      );

      //load data to store
      await dispatch({
        type: LOAD_DATA,
        payload: {
          list: proccessedList,
          hourList: hours,
        },
      });

      //data is loaded
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
      await dispatch(loadLocalList());
    }
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

const getMedicines = async name => {
  const {data} = await axios.get(`${SUGGESTION_API_URL}medicines/${name}/`);
  const uniqueData = [...new Set(data)];
  return uniqueData;
};

const getSupplements = async name => {
  const {data} = await axios.get(`${SUGGESTION_API_URL}supplements/${name}`);
  return data;
};

export const suggestItem = async name => {
  const supplements = await getSupplements(name);
  const medicines = await getMedicines(name);
  const data = [...supplements.slice(0, 3), ...medicines].slice(0, 5);
  return data;
};

export const getByCode = async code => {
  const {data} = await axios.get(
    `${SUGGESTION_API_URL}medicines/code/0${code}`,
  );
  return data;
};
