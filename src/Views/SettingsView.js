import React from 'react';
import MetroText, {REGULAR} from 'atoms/MetroText/MetroText';
import styled from 'styled-components/native';
import Settings from 'organisms/Settings/Settings';

const SettingsWrapper = styled.View`
  padding: 20px 15px 0 15px;
`;

const SettingsView = () => {
  return (
    <SettingsWrapper>
      <MetroText margin="0 0 30px 0" center size={REGULAR}>
        Ustawienia
      </MetroText>
      <Settings />
    </SettingsWrapper>
  );
};

export default SettingsView;
