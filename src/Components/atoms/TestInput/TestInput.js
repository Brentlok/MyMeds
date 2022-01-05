import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {black, light_grey} from 'src/colors';

const Input = ({value, setValue}) => {
  const styles = StyleSheet.create({
    input: {
      flexShrink: 1,
      width: '100%',
      height: 50,
      padding: 15,
      fontFamily: 'Metropolis-Medium',
      color: black,
      borderWidth: 2,
      borderColor: black,
      borderRadius: 9,
      backgroundColor: light_grey,
    },
  });

  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={newValue => setValue(newValue)}
    />
  );
};

export default Input;
