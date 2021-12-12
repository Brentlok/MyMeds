import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const Input = ({value, setValue}) => {
  const styles = StyleSheet.create({
    input: {
      flexShrink: 1,
      width: '100%',
      height: 50,
      padding: 15,
      fontFamily: 'Metropolis-Medium',
      color: '#1f1f1f',
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 9,
      backgroundColor: '#f5f5f5',
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
