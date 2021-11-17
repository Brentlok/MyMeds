import React from 'react';
import styled from 'styled-components/native';
import LogoIcon from 'assets/svg/logo.svg';
import TopMenuIcon from 'assets/svg/menu.svg';
import PersonIcon from 'assets/svg/group.svg';
import HomeIcon from 'assets/svg/home.svg';
import SettingsIcon from 'assets/svg/settings.svg';
import CalendarIcon from 'assets/svg/calendar.svg';
import CalendarIconSmall from 'assets/svg/calendar-small.svg';
import NothingIcon from 'assets/svg/nothing.svg';

export const LOGO = 'LOGO';
export const TOP_MENU = 'TOP_MENU';
export const PERSON = 'PERSON';
export const HOME = 'HOME';
export const SETTINGS = 'SETTINGS';
export const CALENDAR = 'CALENDAR';
export const CALENDAR_SMALL = 'CALENDAR_SMALL';
export const NOTHING = 'NOTHING';

const getIcon = type => {
  switch (type) {
    case LOGO:
      return <LogoIcon />;
    case TOP_MENU:
      return <TopMenuIcon />;
    case PERSON:
      return <PersonIcon />;
    case HOME:
      return <HomeIcon />;
    case SETTINGS:
      return <SettingsIcon />;
    case CALENDAR:
      return <CalendarIcon />;
    case CALENDAR_SMALL:
      return <CalendarIconSmall />;
    case NOTHING:
      return <NothingIcon />;
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

  if ([CALENDAR, HOME, SETTINGS, PERSON].includes(type)) {
    return <Touchable onPress={onPress}>{getIcon(type)}</Touchable>;
  }
  return getIcon(type);
};

export default Icon;
