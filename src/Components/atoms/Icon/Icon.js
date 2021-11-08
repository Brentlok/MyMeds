import React from 'react';
import LogoIcon from 'assets/svg/logo.svg';
import TopMenuIcon from 'assets/svg/menu.svg';
import PersonIcon from 'assets/svg/group.svg';
import HomeIcon from 'assets/svg/home.svg';
import SettingsIcon from 'assets/svg/settings.svg';
import CalendarIcon from 'assets/svg/calendar.svg';

const Icon = ({type}) => {
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
    default:
      return null;
  }
};

export default Icon;
