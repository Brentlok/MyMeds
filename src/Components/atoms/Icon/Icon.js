import React from 'react';
import styled from 'styled-components/native';
import LogoIcon from 'assets/svg/logo.svg';
import TopMenuIcon from 'assets/svg/menu.svg';
import PersonIcon from 'assets/svg/group.svg';
import HomeIcon from 'assets/svg/home.svg';
import SettingsIcon from 'assets/svg/settings.svg';
import CalendarIcon from 'assets/svg/calendar.svg';
import CalendarIconSmall from 'assets/svg/calendar-small.svg';

const getIcon = type => {
  switch (type) {
    case 'logo':
      return <LogoIcon />;
    case 'topMenu':
      return <TopMenuIcon />;
    case 'person':
      return <PersonIcon />;
    case 'home':
      return <HomeIcon />;
    case 'settings':
      return <SettingsIcon />;
    case 'calendar':
      return <CalendarIcon />;
    case 'calendar-small':
      return <CalendarIconSmall />;
    default:
      return null;
  }
};

const Icon = ({type, onPress}) => {
  const Touchable = styled.TouchableOpacity`
    width: 0;
    display: flex;
    align-items: center;
  `;

  if (['calendar', 'home', 'settings', 'person'].includes(type)) {
    return <Touchable onPress={onPress}>{getIcon(type)}</Touchable>;
  }
  return getIcon(type);
};

export default Icon;
