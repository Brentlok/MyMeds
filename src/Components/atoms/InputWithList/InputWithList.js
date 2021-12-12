import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {StyleSheet, TextInput, View, Keyboard} from 'react-native';
import styled from 'styled-components/native';
import MetroText, {INPUT} from 'atoms/MetroText/MetroText';

const Input = forwardRef(({number, options}, ref) => {
  const [borderColor, setBorderColor] = useState('rgba(31,31,31,0.5)');
  const [listOpen, setListOpen] = useState(false);
  const [optionsList, setOptionsList] = useState(options);
  const [inputValue, setInputValue] = useState('');

  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
    getValueType: () => optionsList[0],
    closeList: () => setListOpen(false),
  }));

  const openList = () => {
    Keyboard.dismiss();
    setListOpen(state => !state);
    if (listOpen) {
      if (inputValue) {
        setBorderColor('rgba(31,31,31,1)');
      } else {
        setBorderColor('rgba(31,31,31,0.5)');
      }
    } else {
      setBorderColor('#11d8a5');
    }
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      if (listOpen) {
        setListOpen(false);
      }
    });
  }, [listOpen]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      if (borderColor === '#11d8a5') {
        if (inputValue) {
          setBorderColor('rgba(31,31,31,1)');
        } else {
          setBorderColor('rgba(31,31,31,0.5)');
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = value => {
    if (number) {
      if (/[0-9]/.test(value[value.length - 1]) || value === '') {
        setInputValue(value);
      }
      return;
    }
    setInputValue(value);
  };

  const changeList = item => {
    openList();
    const listWithoutItem = optionsList
      .filter(listItem => listItem !== item)
      .sort((a, b) => a - b);
    setOptionsList([item, ...listWithoutItem]);
  };

  //text-input wont work inside styled-components
  const styles = StyleSheet.create({
    input: {
      flexShrink: 1,
      width: '100%',
      height: 50,
      padding: 15,
      fontFamily: 'Metropolis-Medium',
      color: '#1f1f1f',
    },
    inputWithListWrapper: {
      elevation: listOpen ? 1000 : 0,
      display: 'flex',
      flexDirection: 'row',
      width: 140,
      backgroundColor: '#f5f5f5',
      borderWidth: 2,
      borderColor: borderColor,
      borderRadius: 9,
    },
  });

  const ListWrapper = styled.View`
    position: relative;
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
  `;

  const OpenList = styled.Pressable`
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
  `;

  const OpenedListWrapper = styled.View`
    position: absolute;
    top: 25px;
    elevation: -1;
    background-color: #f5f5f5;
    padding: 25px 0 15px 0;
    width: 72px;
    border: 2px solid ${borderColor};
    border-top-width: 0;
    border-radius: 9px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    display: flex;
    flex-direction: column;
  `;

  const ListItem = styled.Pressable`
    ${!listOpen && 'display: none'}
    display: flex;
    height: 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0px solid ${borderColor};
    border-top-width: 2px;
  `;

  const TriangleUp = styled.View`
    position: absolute;
    right: 5px;
    bottom: 22.5px;
    width: 0;
    height: 0;

    border: 5px solid transparent;
    border-bottom-color: ${borderColor};
  `;

  const TriangleDown = styled.View`
    position: absolute;
    top: 22.5px;
    right: 5px;
    width: 0;
    height: 0;

    border: 5px solid transparent;
    border-top-color: ${borderColor === 'rgba(31,31,31,0.5)'
      ? borderColor
      : 'rgba(31,31,31,1)'};
  `;

  const OpenText = styled(MetroText)`
    margin-right: 10px;
    text-align: center;
  `;

  const Line = styled.View`
    width: 2px;
    height: 50px;
    background-color: ${borderColor};
  `;

  return (
    <View style={styles.inputWithListWrapper}>
      <TextInput
        style={styles.input}
        onChangeText={handleChange}
        value={inputValue}
        onFocus={() => {
          setListOpen(false);
          setBorderColor('#11d8a5');
        }}
        onBlur={() => {
          if (!listOpen) {
            setBorderColor(`rgba(31,31,31,${inputValue ? 1 : 0.5})`);
          }
        }}
        keyboardType={number ? 'numeric' : 'default'}
      />
      <Line />
      <ListWrapper>
        <OpenList onPress={openList}>
          <OpenText
            size={INPUT}
            color={
              borderColor === 'rgba(31,31,31,0.5)'
                ? borderColor
                : 'rgba(31,31,31,1)'
            }>
            {optionsList[0]}
          </OpenText>
          {listOpen ? <TriangleUp /> : <TriangleDown />}
          {listOpen && (
            <OpenedListWrapper>
              {optionsList.slice(1).map(item => (
                <ListItem onPress={() => changeList(item)} key={item}>
                  <MetroText size={INPUT}>{item}</MetroText>
                </ListItem>
              ))}
            </OpenedListWrapper>
          )}
        </OpenList>
      </ListWrapper>
    </View>
  );
});

export default Input;
