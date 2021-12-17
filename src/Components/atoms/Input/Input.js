import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useParams} from 'react-router-native';

const Input = forwardRef(({border, number, password}, ref) => {
  const [borderColor, setBorderColor] = useState('rgba(31,31,31,0.5)');
  const [inputValue, setInputValue] = useState('');
  const [hidePassword, setHidePassword] = useState(!!password);

  const {scan} = useParams();

  useEffect(() => {
    if (scan) {
      setInputValue(scan);
    }
  }, [scan]);

  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
    setValue: value => {
      setInputValue(value);
    },
  }));

  const handleChange = value => {
    if (number) {
      if (/[0-9]/.test(value[value.length - 1]) || value === '') {
        setInputValue(value);
      }
      return;
    }
    setInputValue(value);
  };

  //for some reasons input from styled-components wont work properly
  const styles = StyleSheet.create({
    input: {
      flexShrink: 1,
      height: 50,
      borderWidth: 0,
      padding: 15,
      fontFamily: 'Metropolis-Medium',
      color: '#1f1f1f',
    },
  });

  const stylesWithBorder = StyleSheet.create({
    input: {
      ...styles.input,
      borderWidth: 2,
      borderColor: borderColor,
      borderRadius: 9,
      backgroundColor: '#f5f5f5',
    },
  });

  return (
    <TextInput
      style={border ? stylesWithBorder.input : styles.input}
      onChangeText={handleChange}
      value={inputValue}
      onFocus={() => setBorderColor('#11d8a5')}
      onBlur={() => setBorderColor(`rgba(31,31,31,${inputValue ? 1 : 0.5})`)}
      keyboardType={number ? 'numeric' : 'default'}
      secureTextEntry={hidePassword}
    />
  );
});

export default Input;
