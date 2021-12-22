import React from 'react';
import styled from 'styled-components/native';
import Icon, {SETTINGS, LOGO, PERSON} from 'atoms/Icon/Icon';
import notifee from '@notifee/react-native';

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
  return (
    <PanelWrapper>
      <Icon type={SETTINGS} />
      <Icon type={LOGO} />
      <Icon onPress={getNotifications} type={PERSON} />
    </PanelWrapper>
  );
};

export default TopPanel;
