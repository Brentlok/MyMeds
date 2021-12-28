import React from 'react';
import styled from 'styled-components/native';
import Icon, {INFO, BACK, LOGO, PERSON} from 'atoms/Icon/Icon';
import notifee from '@notifee/react-native';
import {useHistory, useLocation} from 'react-router-native';

const PanelWrapper = styled.View`
  width: 100%;
  height: 100px;
  background-color: #fff;
  padding: 10px 30px 0 30px;
  elevation: 6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const getNotifications = async () => {
  const notificationsList = await (
    await notifee.getTriggerNotifications()
  ).map(({notification}) => notification);
  console.log(notificationsList);
};

const TopPanel = () => {
  const history = useHistory();

  const {pathname} = useLocation();

  const handlePress = () => {
    if (pathname === '/home') {
      history.push('/info');
    } else {
      history.push('/home');
    }
  };

  return (
    <PanelWrapper>
      <Icon type={pathname === '/home' ? INFO : BACK} onPress={handlePress} />
      <Icon type={LOGO} />
      <Icon onPress={() => history.push('/account')} type={PERSON} />
    </PanelWrapper>
  );
};

export default TopPanel;
