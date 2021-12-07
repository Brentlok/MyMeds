const initialState = {
  list: [],
  logged: false,
  modalTakenOpen: false,
  batteryOptimizationChecked: false,
  localDataLoaded: false,
  dataLoaded: false,
};

export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_LOCAL_DATA = 'LOAD_LOCAL_DATA';
export const CHANGE_MODAL_TAKEN_OPEN = 'CHANGE_MODAL_TAKEN_OPEN';
export const DATA_LOADED = 'DATA_LOADED';
export const REMOVE_ITEM = 'REMOVE_ITEM';

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ITEM:
      return {
        ...state,
        list: state.list.filter((item, idx) => idx !== 0),
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
