const initialState = {
  list: [],
  takenList: [],
  muted: [],
  takenToday: [],
  addedForTomorrow: [],
  lastCheckedTime: {hours: 0, minutes: 0},
  modalTakenOpen: false,
  itemToRemove: 0,
  modalText: 'Czy już przyjąłeś?',
  localDataLoaded: false,
  dataLoaded: false,
  accessToken: null,
  newPath: '',
  mail: '',
  password: '',
};

export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_LOCAL_DATA = 'LOAD_LOCAL_DATA';
export const CHANGE_MODAL_TAKEN_OPEN = 'CHANGE_MODAL_TAKEN_OPEN';
export const DATA_LOADED = 'DATA_LOADED';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const LOGIN = 'LOGIN';
export const CHANGE_PATH = 'CHANGE_PATH';
export const ADD_TAKEN_TODAY = 'ADD_TAKEN_TODAY';
export const ADD_TOMORROW = 'ADD_TOMORROW';
export const SAVE_REGISTER_DATA = 'SAVE_REGISTER_DATA';

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    case REMOVE_ITEM:
      return {
        ...state,
      };
    case CHANGE_MODAL_TAKEN_OPEN: {
      return {
        ...state,
        modalTakenOpen: !state.modalTakenOpen,
        modalText: action.payload.modalText || state.modalText,
        itemToRemove: action.payload.itemToRemove,
      };
    }
    case LOAD_DATA: {
      return {
        ...state,
        list: action.payload.list,
        hourList: action.payload.hourList,
      };
    }
    case LOAD_LOCAL_DATA: {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        takenToday: action.payload.takenToday,
        muted: action.payload.muted,
        lastCheckedTime: action.payload.lastCheckedTime,
        localDataLoaded: true,
      };
    }
    case DATA_LOADED: {
      return {
        ...state,
        dataLoaded: action.payload.dataLoaded,
      };
    }
    case CHANGE_PATH: {
      return {
        ...state,
        newPath: action.payload.newPath,
      };
    }
    case ADD_TAKEN_TODAY: {
      return {
        ...state,
        takenToday: action.payload.newTakenToday,
      };
    }
    case ADD_TOMORROW: {
      return {
        ...state,
        addedForTomorrow: [
          ...state.addedForTomorrow,
          action.payload.addedForTomorrow,
        ],
      };
    }
    case SAVE_REGISTER_DATA: {
      return {
        ...state,
        mail: action.payload.mail,
        password: action.payload.password,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
