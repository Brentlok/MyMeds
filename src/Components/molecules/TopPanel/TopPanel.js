import React from 'react';
import styled from 'styled-components/native';
import Icon, {SETTINGS, LOGO, PERSON} from 'atoms/Icon/Icon';
import notifee from '@notifee/react-native';

const PanelWrapper = styled.View`
  width: 100%;
  height: 120px;
  background-color: #f5f5f5;
  elevation: 6;
  padding: 20px 30px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
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
