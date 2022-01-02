import axios from 'axios';
import {LOAD_DATA, DATA_LOADED, LOGIN, ADD_TOMORROW} from 'src/reducers';
import store from 'src/store';
import {getNow} from 'src/Utils/getDate';
import {changePath, addTakenToday, changeModalTakenOpen} from '.';
import {saveLocalData, loadLocalList} from './local_storage_actions';
const API_URL = 'http://51.38.131.160:8080/api/';

export const register = async (email, password, name) => {
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
