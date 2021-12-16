import React from 'react';
import styled from 'styled-components/native';
import StartPanel from 'organisms/StartPanel/StartPanel';
import Icon, {LOGO} from 'atoms/Icon/Icon';
import {Text} from 'react-native';

const LoginView = ({match}) => {
  const {
    params: {where},
  } = match;

  const LoginWrapper = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 15px;
  `;

  return (
    <LoginWrapper>
      <Icon type={LOGO} />
      {where === 'start' ? <StartPanel /> : <Text>{where}</Text>}
      {/* Add form and use different inputs based on some prop */}
    </LoginWrapper>
  );
};

export default LoginView;
