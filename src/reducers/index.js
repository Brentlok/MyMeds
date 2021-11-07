const initialState = {
  path: '/',
  oldPath: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PATH':
      return {
        ...state,
        path: action.payload.newPath,
        oldPath: state.path,
      };
    case 'CHANGE_INPUT_FOCUS': {
      return {
        ...state,
        inputFocused: action.payload.inputFocused,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
