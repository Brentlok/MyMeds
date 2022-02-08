import React from 'react';
import styled from 'styled-components/native';
import Icon, {HOME, ADD, MESSAGE, PERSON} from 'atoms/Icon/Icon';
import {useLocation, useHistory} from 'react-router-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {displayNotification} from 'src/hooks/useNotification';
import {grey, white} from 'src/colors';
import {Dimensions} from 'react-native';

const BottomPanel = () => {
  const history = useHistory();

  const {isInternetReachable} = useNetInfo();

  const {pathname} = useLocation();

  const PanelWrapper = styled.View`
    position: absolute;
    bottom: 0;
    left: 0px;
    width: ${Dimensions.get('window').width}px;
    height: 70px;
    background-color: ${white};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border: 0px solid ${grey};
    border-top-width: 1px;
    padding: 0 40px;
  `;

  const navigateTo = newPath => {
    if (
      (newPath === '/add' || newPath === '/message') &&
      !isInternetReachable
    ) {
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
        active={pathname.includes('/home')}
      />

      <Icon
        onPress={() => navigateTo('/account')}
        type={PERSON}
        active={pathname.includes('/account')}
      />
    </PanelWrapper>
  );
};

export default BottomPanel;
