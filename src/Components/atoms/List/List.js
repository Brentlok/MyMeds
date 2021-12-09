import React, {useState} from 'react';
import styled from 'styled-components/native';
import MetroText, {INPUT} from 'atoms/MetroText/MetroText';

const List = ({options, openText}) => {
  const [listOpen, setListOpen] = useState(false);

  const openList = () => {
    setListOpen(state => !state);
  };

  const ListWrapper = styled.View`
    border: 1px solid black;
  `;

  const OpenList = styled.Pressable``;

  const ListItem = styled.Pressable`
    ${!listOpen && 'display: none'}
  `;

  return (
    <ListWrapper>
      <OpenList onPress={openList}>
        <MetroText size={INPUT}>{openText}</MetroText>
      </OpenList>
      {options.map(item => (
        <ListItem key={item}>
          <MetroText size={INPUT}>item</MetroText>
        </ListItem>
      ))}
    </ListWrapper>
  );
};

export default List;
