import React from 'react';
import styled from 'styled-components/native';
import StartPanel from 'organisms/StartPanel/StartPanel';
import Icon, {LOGO} from 'atoms/Icon/Icon';
import RegisterOrLogin from 'organisms/RegisterOrLogin/RegisterOrLogin';

const LoginView = ({match}) => {
  const {
    params: {where},
  } = match;

  const LoginWrapper = styled.View`
    display: flex;
    flex-direction: column;
    padding: 30px 15px;
  `;

  const Logo = styled.View`
    margin: auto;
  `;

  return (
    <LoginWrapper>
      <Logo>
        <Icon type={LOGO} />
      </Logo>
      {where === 'start' ? <StartPanel /> : <RegisterOrLogin where={where} />}
    </LoginWrapper>
  );
};

export default LoginView;
