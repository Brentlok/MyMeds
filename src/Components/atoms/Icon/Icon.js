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
import YesIcon from 'assets/svg/yes.svg';
import NoIcon from 'assets/svg/no.svg';
import CloseIcon from 'assets/svg/close.svg';
import RingIcon from 'assets/svg/ring.svg';
import OpenModalIcon from 'assets/svg/openModal.svg';

export const LOGO = 'LOGO';
export const TOP_MENU = 'TOP_MENU';
export const PERSON = 'PERSON';
export const HOME = 'HOME';
export const SETTINGS = 'SETTINGS';
export const CALENDAR = 'CALENDAR';
export const CALENDAR_SMALL = 'CALENDAR_SMALL';
export const NOTHING = 'NOTHING';
export const YES = 'YES';
export const NO = 'NO';
export const CLOSE = 'CLOSE';
export const RING = 'RING';
export const OPEN_MODAL = 'OPEN_MODAL';

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
    case YES:
      return <YesIcon />;
    case NO:
      return <NoIcon />;
    case CLOSE:
      return <CloseIcon />;
    case RING:
      return <RingIcon />;
    case OPEN_MODAL:
      return <OpenModalIcon />;
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

  if (
    [CALENDAR, HOME, SETTINGS, PERSON, CLOSE, RING, OPEN_MODAL].includes(type)
  ) {
    return <Touchable onPress={onPress}>{getIcon(type)}</Touchable>;
  }
  return getIcon(type);
};

export default Icon;
