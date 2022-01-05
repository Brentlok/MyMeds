import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useParams} from 'react-router-native';
import TogglePasswordIcon from 'assets/svg/password.svg';
import {black, primary, light_grey, grey} from 'src/colors';

const Input = forwardRef(({border, number, password, autoComplete}, ref) => {
  const [borderColor, setBorderColor] = useState(grey);
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
      color: black,
    },
  });

  const stylesWithBorder = StyleSheet.create({
    input: {
      ...styles.input,
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
        style={border ? stylesWithBorder.input : styles.input}
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
          onPressIn={() => setHidePassword(false)}
          onPressOut={() => setHidePassword(true)}
          style={stylesWithBorder.togglePassword}>
          <TogglePasswordIcon />
        </TouchableOpacity>
      )}
    </>
  );
});

export default Input;
