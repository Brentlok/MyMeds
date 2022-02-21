import {
  CHANGE_MODAL_TAKEN_OPEN,
  CHANGE_PATH,
  ADD_TAKEN_TODAY,
  SAVE_REGISTER_DATA,
} from 'src/reducers';
import store from 'src/store';
import {notifyTomorrow} from 'src/hooks/useNotification';
import {saveLocalData, loadLocalData} from './local_storage_actions';

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

export const addTakenToday = (hour, notification) => async dispatch => {
  if (notification) {
    //if it comes from notification
    await dispatch(loadLocalData());
  } else {
    notifyTomorrow(hour);
  }

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

export const changePath = newPath => ({type: CHANGE_PATH, payload: {newPath}});

export const saveRegisterData = ({mail, password}) => ({
  type: SAVE_REGISTER_DATA,
  payload: {mail, password},
});
