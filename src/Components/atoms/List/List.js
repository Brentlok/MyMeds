import React, {useState} from 'react';
import styled from 'styled-components/native';
import MetroText, {INPUT} from 'atoms/MetroText/MetroText';

const List = ({options, openText}) => {
  const [listOpen, setListOpen] = useState(false);

  const openList = () => {
    setListOpen(state => !state);
  };

  const ListWrapper = styled.View`
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-right: 15px;
    margin-top: 10px;
  `;

  const OpenList = styled.Pressable`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
  `;

  const ListItem = styled.Pressable`
    ${!listOpen && 'display: none'}
  `;

  const TriangleUp = styled.View`
    width: 0;
    height: 0;

    border: 5px solid transparent;
    border-bottom-color: #11d8a5;
  `;

  const TriangleDown = styled.View`
    width: 0;
    height: 0;

    border: 5px solid transparent;
    border-top-color: #1f1f1f;
  `;

  const OpenText = styled(MetroText)`
    margin-right: 10px;
  `;

  return (
    <ListWrapper>
      <OpenList onPress={openList}>
        <OpenText size={INPUT}>{openText}</OpenText>
        {listOpen ? <TriangleUp /> : <TriangleDown />}
      </OpenList>
      {options.map(item => (
        <ListItem key={item}>
          <MetroText size={INPUT}>{item}</MetroText>
        </ListItem>
      ))}
    </ListWrapper>
  );
};

export default List;
