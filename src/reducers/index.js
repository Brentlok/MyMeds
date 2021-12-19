const initialState = {
  list: [],
  takenList: [],
  modalTakenOpen: false,
  batteryOptimizationChecked: false,
  localDataLoaded: false,
  dataLoaded: false,
  accessToken: null,
  newPath: '',
};

export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_LOCAL_DATA = 'LOAD_LOCAL_DATA';
export const CHANGE_MODAL_TAKEN_OPEN = 'CHANGE_MODAL_TAKEN_OPEN';
export const DATA_LOADED = 'DATA_LOADED';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const LOGIN = 'LOGIN';
export const CHANGE_PATH = 'CHANGE_PATH';

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
        batteryOptimizationChecked: action.payload.batteryOptimizationChecked,
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
    default:
      return state;
  }
};

export default rootReducer;
