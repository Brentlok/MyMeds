import React, {forwardRef, useState, useImperativeHandle} from 'react';
import styled from 'styled-components/native';
import MetroText, {EXTRA_SMALL, MEDIUM} from 'atoms/MetroText/MetroText';
import {TextInput, View, StyleSheet} from 'react-native';

const Amount = forwardRef((props, ref) => {
  const amountTypes = ['szt.', 'g', 'ml.'];

  const [inputValue, setInputValue] = useState('1');
  const [amountTypeIndex, setAmountTypeIndex] = useState(0);

  const styles = StyleSheet.create({
    wrapper: {
      width: 140,
      marginTop: 15,
      marginBottom: 30,
      display: 'flex',
      flexDirection: 'row',
      height: 50,
      backgroundColor: '#f5f5f5',
      borderRadius: 9,
      borderWidth: 2,
      borderColor: '#1f1f1f',
    },
    input: {
      textAlign: 'center',
      fontFamily: 'Metropolis-Medium',
      color: '#1f1f1f',
      width: 68,
    },
  });

  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
    getValueType: () => amountTypes[amountTypeIndex],
  }));

  const handleTypeChange = value => {
    const newIndex = amountTypeIndex + value;
    if (newIndex === -1) {
      setAmountTypeIndex(amountTypes.length - 1);
      return;
    }
    if (newIndex === amountTypes.length) {
      setAmountTypeIndex(0);
      return;
    }
    setAmountTypeIndex(newIndex);
  };

  const handleInputChange = value => {
    if (value.length > 3) {
      return;
    }
    if (inputValue[0] === '0' && value !== '') {
      setInputValue(value.slice(1));
      return;
    }
    if (/[0-9]/.test(value[value.length - 1])) {
      setInputValue(value);
      return;
    }
    setInputValue('0');
  };

  const AmountType = styled.View`
    width: 68px;
    border: 0px solid #1f1f1f;
    border-left-width: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  `;

  const IconBox = styled.TouchableOpacity`
    width: 16px;
    height: 16px;
  `;

  const Triangle = styled.View`
    width: 0;
    height: 0;
    margin-top: 1px;
    border-top-width: 7.5px;
    border-top-color: transparent;
    border-bottom-width: 7.5px;
    border-bottom-color: transparent;
    margin-left: 5px;
  `;

  const Triangle1 = styled(Triangle)`
    border-right-width: 7.5px;
    border-right-color: #1f1f1f;
  `;

  const Triangle2 = styled(Triangle)`
    border-left-width: 7.5px;
    border-left-color: #1f1f1f;
  `;

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleInputChange}
        keyboardType="numeric"
      />
      <AmountType>
        <IconBox onPress={() => handleTypeChange(-1)}>
          <Triangle1 />
        </IconBox>
        <MetroText size={EXTRA_SMALL} weight={MEDIUM}>
          {amountTypes[amountTypeIndex]}
        </MetroText>
        <IconBox onPress={() => handleTypeChange(1)}>
          <Triangle2 />
        </IconBox>
      </AmountType>
    </View>
  );
});

export default Amount;
