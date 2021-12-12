import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import MetroText, {INPUT} from 'atoms/MetroText/MetroText';

const List = forwardRef(({options}, ref) => {
  const [listOpen, setListOpen] = useState(false);
  const [optionsList, setOptionsList] = useState(options);
  const [borderColor, setBorderColor] = useState('#1f1f1f');

  const openList = () => {
    Keyboard.dismiss();
    setListOpen(state => !state);
    if (listOpen) {
      setBorderColor('#1f1f1f');
    } else {
      setBorderColor('#11d8a5');
    }
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setListOpen(false);
      setBorderColor('#1f1f1f');
    });
  }, []);

  const changeList = item => {
    openList();
    const listWithoutItem = optionsList
      .filter(listItem => listItem !== item)
      .sort((a, b) => a - b);
    setOptionsList([item, ...listWithoutItem]);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => optionsList[0],
    closeList: () => setListOpen(false),
  }));

  const ListWrapper = styled.View`
    ${listOpen && 'elevation: 100000;'}
    background-color: #f5f5f5;
    width: 140px;
    border: 2px solid ${borderColor};
    border-radius: 9px;
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
    background-color: #f5f5f5;
    padding: 25px 0 15px 0;
    position: absolute;
    elevation: -10;
    top: 23px;
    width: 140px;
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
    border-top-color: ${borderColor};
  `;

  const OpenText = styled(MetroText)`
    margin-right: 10px;
    text-align: center;
  `;

  return (
    <ListWrapper>
      <OpenList onPress={openList}>
        <OpenText size={INPUT}>{optionsList[0]}</OpenText>
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
  );
});

export default List;
