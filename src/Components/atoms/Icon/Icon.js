import React from 'react';
import styled from 'styled-components/native';
import {primary, black} from 'src/colors';

import LogoIcon from 'assets/svg/logo.svg';
import PersonIcon from 'assets/svg/person.svg';
import InfoIcon from 'assets/svg/info.svg';
import NothingIcon from 'assets/svg/nothing.svg';
import YesIcon from 'assets/svg/yes.svg';
import NoIcon from 'assets/svg/no.svg';
import CloseIcon from 'assets/svg/close.svg';
import RingIcon from 'assets/svg/ring.svg';
import RingIconMuted from 'assets/svg/ring_muted.svg';
import OpenModalIcon from 'assets/svg/openModal.svg';
import HomeIcon from 'assets/svg/home.svg';
import AddIcon from 'assets/svg/add.svg';
import CalendarIcon from 'assets/svg/calendar.svg';
import RefreshIcon from 'assets/svg/refresh.svg';
import MessageIcon from 'assets/svg/message.svg';

export const LOGO = 'LOGO';
export const LOGO_BIG = 'LOGO_BIG';
export const PERSON = 'PERSON';
export const PERSON_BIG = 'PERSON_BIG';
export const INFO = 'INFO';
export const CALENDAR_SMALL = 'CALENDAR_SMALL';
export const NOTHING = 'NOTHING';
export const YES = 'YES';
export const NO = 'NO';
export const CLOSE = 'CLOSE';
export const RING = 'RING';
export const RING_MUTED = 'RING_MUTED';
export const OPEN_MODAL = 'OPEN_MODAL';
export const MESSAGE = 'MESSAGE';
export const CALENDAR = 'CALENDAR';
export const HOME = 'HOME';
export const ADD = 'ADD';
export const ACTIVE = 'ACTIVE';
export const REFRESH = 'REFRESH';

const getIcon = (type, active) => {
  switch (type) {
    case LOGO:
      return <LogoIcon width={130} />;
    case LOGO_BIG:
      return <LogoIcon width={300} />;
    case PERSON_BIG:
      return <PersonIcon />;
    case INFO:
      return <InfoIcon />;
    case CALENDAR_SMALL:
      return <CalendarIcon width={20} />;
    case NOTHING:
      return <NothingIcon height={120} />;
    case YES:
      return <YesIcon />;
    case NO:
      return <NoIcon />;
    case CLOSE:
      return <CloseIcon />;
    case RING:
      return <RingIcon />;
    case RING_MUTED:
      return <RingIconMuted />;
    case OPEN_MODAL:
      return <OpenModalIcon />;
    case PERSON:
      return <PersonIcon width={34} fill={active ? primary : black} />;
    case MESSAGE:
      return <MessageIcon fill={active ? primary : black} />;
    case HOME:
      return <HomeIcon fill={active ? primary : black} />;
    case CALENDAR:
      return <CalendarIcon fill={active ? primary : black} />;
    case ADD:
      return <AddIcon width={34} fill={active ? primary : black} />;
    case REFRESH:
      return <RefreshIcon />;
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
    [
      CALENDAR,
      HOME,
      INFO,
      PERSON,
      CLOSE,
      RING,
      RING_MUTED,
      OPEN_MODAL,
      ADD,
      REFRESH,
      MESSAGE,
    ].includes(type)
  ) {
    return <Touchable onPress={onPress}>{getIcon(type, active)}</Touchable>;
  }
  return getIcon(type);
};

export default Icon;
