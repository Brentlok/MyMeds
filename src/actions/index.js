import axios from 'axios';
import {LOAD_DATA} from 'src/reducers';

export const loadData = () => async dispatch => {
  try {
    const response = await axios.get(
      'https://run.mocky.io/v3/36934bf9-fcd5-498f-88e2-1c3e6c00d0a0',
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
  } catch (error) {
    console.log(error);
  }
};

export const changePath = newPath => ({
  type: 'CHANGE_PATH',
  payload: {
    newPath,
  },
});

export const changeInputFocus = value => ({
  type: 'CHANGE_INPUT_FOCUS',
  payload: {
    inputFocused: value,
  },
});
