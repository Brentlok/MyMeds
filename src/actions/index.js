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
