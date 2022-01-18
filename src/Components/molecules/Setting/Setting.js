import React from 'react';
import styled from 'styled-components/native';
import MetroText, {EXTRA_SMALL, SMALL, MEDIUM} from 'atoms/MetroText/MetroText';
import {primary} from 'src/colors';

const SettingText = styled(MetroText)`
  margin-bottom: 15px;
`;

const Open = styled.TouchableOpacity``;

const OpenText = styled(MetroText)`
  text-decoration: underline;
  margin-bottom: 30px;
`;

const Setting = ({title, body, open, openAction}) => {
  return (
    <>
      <SettingText size={SMALL}>{title}</SettingText>
      <SettingText size={EXTRA_SMALL} weight={MEDIUM}>
        {body}
      </SettingText>
      <Open onPress={openAction}>
        <OpenText size={EXTRA_SMALL} color={primary} weight={MEDIUM}>
          {open}
        </OpenText>
      </Open>
    </>
  );
};

export default Setting;
