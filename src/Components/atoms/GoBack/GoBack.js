import React from 'react';
import styled from 'styled-components/native';

import BackIcon from 'assets/svg/back.svg';
import {useHistory} from 'react-router-native';

const PressBox = styled.TouchableOpacity`
  position: absolute;
  height: 70px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  elevation: 100;
  left: 15px;
`;

const GoBack = ({show}) => {
  const history = useHistory();

  const handlePress = () => {
    const previousLocation =
      history.entries[history.entries.length - 2].pathname;
    history.push(previousLocation);
  };

  return show ? (
    <PressBox onPress={handlePress}>
      <BackIcon />
    </PressBox>
  ) : null;
};

export default GoBack;
