import React from 'react';
import styled from 'styled-components/native';
import Icon, {HOME, CALENDAR, ADD} from 'atoms/Icon/Icon';
import {useLocation, useHistory} from 'react-router-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {displayNotification} from 'src/hooks/useNotification';

const BottomPanel = () => {
  const history = useHistory();

  const {isInternetReachable} = useNetInfo();

  const {pathname} = useLocation();

  const PanelWrapper = styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border: 0px solid #cdcdcd;
    border-top-width: 1px;
    padding: 0 40px;
  `;

  const navigateTo = newPath => {
    if (newPath === '/add' && !isInternetReachable) {
      displayNotification(
        'Nie masz połączenia z internetem',
        'Spróbuj ponownie później...',
      );
      return;
    }
    history.push(newPath);
  };

  return (
    <PanelWrapper>
      <Icon
        onPress={() => navigateTo('/add')}
        type={ADD}
        active={pathname.includes('/add')}
      />
      <Icon
        onPress={() => navigateTo('/home')}
        type={HOME}
        active={pathname === '/home'}
      />
      <Icon
        onPress={() => navigateTo('/calendar')}
        type={CALENDAR}
        active={pathname === '/calendar'}
      />
    </PanelWrapper>
  );
};

export default BottomPanel;
