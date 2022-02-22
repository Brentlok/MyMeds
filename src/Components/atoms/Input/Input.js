import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import TogglePasswordIcon from 'assets/svg/password.svg';
import {black, primary, light_grey, grey} from 'src/colors';

const Input = forwardRef(({number, password, autoComplete}, ref) => {
  const [borderColor, setBorderColor] = useState(grey);
  const [inputValue, setInputValue] = useState('');
  const [hidePassword, setHidePassword] = useState(!!password);

  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
    setValue: value => {
      setInputValue(value);
    },
    setBorderColor: value => {
      setBorderColor(value);
    },
  }));

  const handleChange = value => {
    if (number) {
      if (/[0-9]/.test(value[value.length - 1]) || value === '') {
        setInputValue(value);
      }
      return;
    }
    setInputValue(value.replaceAll(' ', ''));
  };

  //for some reasons input from styled-components wont work properly
  const styles = StyleSheet.create({
    input: {
      width: '100%',
      marginRight: 15,
      flexShrink: 1,
      height: 50,
      padding: 15,
      fontFamily: 'Metropolis-Medium',
      color: black,
      borderWidth: 2,
      borderColor: borderColor,
      borderRadius: 9,
      backgroundColor: light_grey,
    },
    togglePassword: {
      position: 'absolute',
      bottom: 15,
      right: 15,
    },
  });

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={handleChange}
        value={inputValue}
        onFocus={() => setBorderColor(primary)}
        onBlur={() => setBorderColor(inputValue ? black : grey)}
        autoComplete={autoComplete}
        keyboardType={number ? 'numeric' : 'default'}
        secureTextEntry={hidePassword}
      />
      {password && (
        <TouchableOpacity
          onPress={() => setHidePassword(hide => !hide)}
          style={styles.togglePassword}>
          <TogglePasswordIcon />
        </TouchableOpacity>
      )}
    </>
  );
});

export default Input;
