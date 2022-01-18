import React from 'react';
import styled from 'styled-components/native';
import {Linking} from 'react-native';
import {checkForBatteryPermission} from 'src/Utils/powerSettings';
import Setting from 'molecules/Setting/Setting';

const SettingsWrapper = styled.View`
  padding: 0 15px;
`;

const settingsList = [
  {
    title: 'Sprawdź optymalizacje baterii',
    body: 'Optymalizacja baterii nałożona na aplikację może powodować problemy z powiadomieniami o twoich lekach i suplementach.',
    open: 'Sprawdź to ustawienie',
    openAction: checkForBatteryPermission,
  },
  {
    title: 'Pozostałe ustawienia',
    body: 'Warto sprawdzić również inne ustawienia aplikacji, dotyczące powiadomień, dostępu do aparatu, i wielu innych.',
    open: 'Otwórz wszystkie ustawienia',
    openAction: () => Linking.openSettings(),
  },
];

const Settings = () => {
  return (
    <SettingsWrapper>
      {settingsList.map(item => (
        <Setting {...item} key={item.title} />
      ))}
    </SettingsWrapper>
  );
};

export default Settings;
