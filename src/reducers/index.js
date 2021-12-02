const initialState = {
  list: [],
  logged: false,
  modalTakenOpen: false,
  batteryOptimizationChecked: false,
  localDataLoaded: false,
  dataLoaded: false,
};

export const CHANGE_PATH = 'CHANGE_PATH';
export const CHANGE_INPUT_FOCUS = 'CHANGE_INPUT_FOCUS';
export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_LOCAL_DATA = 'LOAD_LOCAL_DATA';
export const CHANGE_MODAL_TAKEN_OPEN = 'CHANGE_MODAL_TAKEN_OPEN';
export const DATA_LOADED = 'DATA_LOADED';

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PATH:
      return {
        ...state,
        path: action.payload.newPath,
        oldPath: state.path,
      };
    case CHANGE_INPUT_FOCUS: {
      return {
        ...state,
        inputFocused: action.payload.inputFocused,
      };
    }
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
      };
    }
    case LOAD_LOCAL_DATA: {
      return {
        ...state,
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
    default:
      return state;
  }
};

export default rootReducer;
