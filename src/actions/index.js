import axios from 'axios';
import {LOAD_DATA} from 'src/reducers';

export const loadData = () => async dispatch => {
  try {
    const response = await axios.get(
      'https://61977158af46280017e7e618.mockapi.io/list',
    );
    const list = response.data.sort(
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

export const changeModalTakenOpen = () => ({type: 'CHANGE_MODAL_TAKEN_OPEN'});
