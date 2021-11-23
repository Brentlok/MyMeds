import axios from 'axios';
import {
  LOAD_DATA,
  CHANGE_PATH,
  CHANGE_INPUT_FOCUS,
  CHANGE_MODAL_TAKEN_OPEN,
  DATA_LOADED,
} from 'src/reducers';

export const loadData = () => async dispatch => {
  try {
    const response = await axios.get(
      'https://run.mocky.io/v3/0b9143b1-fc7a-4595-8cee-7d56375682c8',
    );
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

export const changePath = newPath => ({
  type: CHANGE_PATH,
  payload: {
    newPath,
  },
});

export const changeInputFocus = value => ({
  type: CHANGE_INPUT_FOCUS,
  payload: {
    inputFocused: value,
  },
});

export const changeModalTakenOpen = () => ({type: CHANGE_MODAL_TAKEN_OPEN});
