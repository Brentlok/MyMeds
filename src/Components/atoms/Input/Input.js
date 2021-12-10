import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setInputFocused} from 'src/actions';

const Input = () => {
  const [inputValue, changeInputValue] = useState('');

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const {inputFocused} = useSelector(state => state);

  useEffect(() => {
    if (!inputFocused) {
      inputRef.current.blur();
    }
  }, [inputFocused]);

  const handleFocus = () => {
    dispatch(setInputFocused());
  };

  //for some reasons input from styled-components wont work properly
  const styles = StyleSheet.create({
    input: {
      width: '50%',
      height: 50,
      borderWidth: 0,
      padding: 15,
      fontFamily: 'Metropolis-Medium',
      color: '#1f1f1f',
      maxWidth: 320,
    },
  });

  return (
    <TextInput
      style={styles.input}
      onChangeText={changeInputValue}
      value={inputValue}
      ref={inputRef}
      onFocus={handleFocus}
    />
  );
};

export default Input;
