import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import LogoIcon from 'assets/svg/logo.svg';
import PersonIcon from 'assets/svg/avatar.svg';
import SettingsIcon from 'assets/svg/settings.svg';
import NothingIcon from 'assets/svg/nothing.svg';
import YesIcon from 'assets/svg/yes.svg';
import NoIcon from 'assets/svg/no.svg';
import CloseIcon from 'assets/svg/close.svg';
import RingIcon from 'assets/svg/ring.svg';
import OpenModalIcon from 'assets/svg/openModal.svg';
import HomeIcon from 'assets/svg/home.svg';
import HomeIconActive from 'assets/svg/home-active.svg';
import AddIcon from 'assets/svg/add.svg';
import AddIconActive from 'assets/svg/add-active.svg';
import CalendarIcon from 'assets/svg/calendar.svg';
import CalendarIconActive from 'assets/svg/calendar-active.svg';

export const LOGO = 'LOGO';
export const PERSON = 'PERSON';
export const SETTINGS = 'SETTINGS';
export const CALENDAR_SMALL = 'CALENDAR_SMALL';
export const NOTHING = 'NOTHING';
export const YES = 'YES';
export const NO = 'NO';
export const CLOSE = 'CLOSE';
export const RING = 'RING';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CALENDAR = 'CALENDAR';
export const HOME = 'HOME';
export const ADD = 'ADD';
export const ACTIVE = 'ACTIVE';

const getIcon = (type, active) => {
  switch (type) {
    case LOGO:
      return <LogoIcon />;
    case PERSON:
      return <PersonIcon />;
    case SETTINGS:
      return <SettingsIcon />;
    case CALENDAR_SMALL:
      return <CalendarIcon width={20} />;
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
    case HOME:
      return active ? <HomeIconActive /> : <HomeIcon />;
    case CALENDAR:
      return active ? <CalendarIconActive /> : <CalendarIcon />;
    case ADD:
      return active ? <AddIconActive /> : <AddIcon />;
    default:
      return null;
  }
};

const Icon = ({type, onPress, active}) => {
  const Touchable = styled.TouchableOpacity`
    width: 0;
    display: flex;
    align-items: center;
  `;

  if (
    [CALENDAR, HOME, SETTINGS, PERSON, CLOSE, RING, OPEN_MODAL, ADD].includes(
      type,
    )
  ) {
    return <Touchable onPress={onPress}>{getIcon(type, active)}</Touchable>;
  }
  return getIcon(type);
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default Icon;
