import React from 'react';
import styled from 'styled-components/native';

import BackIcon from 'assets/svg/back.svg';
import {useHistory, useLocation} from 'react-router-native';

const PressBox = styled.TouchableOpacity`
  position: absolute;
  height: 70px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  elevation: 10;
  left: 15px;
`;

const GoBack = ({show}) => {
  const history = useHistory();

  const {pathname} = useLocation();

  const handlePress = () => {
    if (['/calendar', '/add', '/message', '/account'].includes(pathname)) {
      history.push('/home');
    } else {
      history.goBack();
    }
  };

  return show ? (
    <PressBox onPress={handlePress}>
      <BackIcon />
    </PressBox>
  ) : null;
};

export default GoBack;
