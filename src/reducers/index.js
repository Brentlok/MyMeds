const initialState = {
  list: [
    {
      time: {
        hours: '7',
        minutes: '00',
      },
      medsList: [
        {
          name: 'Witamina C',
          quantity: 2,
          quantityType: 'tabletki',
        },
      ],
    },
    {
      time: {
        hours: '12',
        minutes: '32',
      },
      medsList: [
        {
          name: 'Witamina D',
          quantity: 4,
          quantityType: 'krople',
        },
      ],
    },
    {
      time: {
        hours: '20',
        minutes: '12',
      },
      medsList: [
        {
          name: 'Magnez',
          quantity: 1,
          quantityType: 'tabletka',
        },
      ],
    },
  ],
  inputFocused: false,
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
