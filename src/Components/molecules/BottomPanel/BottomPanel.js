import React from 'react';
import styled from 'styled-components/native';
import Icon, {HOME, CALENDAR, ADD} from 'atoms/Icon/Icon';
import {useLocation, useHistory} from 'react-router-native';
import {useSelector} from 'react-redux';

const BottomPanel = () => {
  const history = useHistory();

  const {dataLoaded} = useSelector(state => state);

  const {pathname} = useLocation();

  const PanelWrapper = styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    elevation: 1;
    align-items: center;
    flex-direction: row;
    border: 0px solid #cdcdcd;
    border-top-width: 1px;
    padding: 0 40px;
  `;

  const navigateTo = newPath => {
    if (dataLoaded === 'not_verified') {
      return;
    }
    console.log(dataLoaded);
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
