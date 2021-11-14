import React from 'react';
import styled from 'styled-components/native';
import Icon from 'atoms/Icon/Icon';
import PushNotification from 'react-native-push-notification';

const PanelWrapper = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border: 0px solid #cdcdcd;
  border-top-width: 1px;
  padding: 40px;
`;

const TopPanel = () => {
  const date = new Date(Date.now() + 1000);
  const testNotification = () => {
    PushNotification.localNotificationSchedule({
      id: '123',
      userInfo: {id: '123'},
      channelId: 'my-meds-notifications',
      title: 'Przypomnienie',
      message: 'pora na leki',
      date: date,
      repeatType: 'day',
      repeatTime: 1,
      soundName: 'default',
    });
  };

  return (
    <PanelWrapper>
      <Icon onPress={testNotification} type="calendar" />
      <Icon type="home" />
      <Icon type="settings" />
    </PanelWrapper>
  );
};

export default TopPanel;
