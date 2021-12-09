import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setInputFocused} from '../../../actions';

const Input = () => {
  const [inputValue, changeInputValue] = useState('');
  const [borderColor, changeBorderColor] = useState('rgba(31,31,31,0.5)');

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const {inputFocused} = useSelector(state => state);

  useEffect(() => {
    if (!inputFocused) {
      inputRef.current.blur();
    }
  }, [inputFocused]);

  const handleFocus = () => {
    changeBorderColor('#11D8A5');
    dispatch(setInputFocused());
  };

  const handleBlur = () => {
    changeBorderColor(`rgba(31,31,31,${inputValue ? 1 : 0.5})`);
  };

  //for some reasons input from styled-components wont work properly
  const styles = StyleSheet.create({
    input: {
      height: 50,
      borderWidth: 2,
      padding: 15,
      fontFamily: 'Metropolis-Medium',
      borderColor: borderColor,
      color: '#1f1f1f',
      maxWidth: 320,
      borderRadius: 9,
    },
  });

  return (
    <TextInput
      style={styles.input}
      onChangeText={changeInputValue}
      value={inputValue}
      ref={inputRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default Input;
