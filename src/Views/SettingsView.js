import React from 'react';
import MetroText, {REGULAR} from 'atoms/MetroText/MetroText';
import Settings from 'organisms/Settings/Settings';

const SettingsView = () => {
  return (
    <>
      <MetroText margin="0 0 30px 0" center size={REGULAR}>
        Ustawienia
      </MetroText>
      <Settings />
    </>
  );
};

export default SettingsView;
