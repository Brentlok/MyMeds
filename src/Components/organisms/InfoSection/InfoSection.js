import React from 'react';
import styled from 'styled-components/native';
import {Linking} from 'react-native';
import {checkForBatteryPermission} from 'src/Utils/powerSettings';
import MetroText, {EXTRA_SMALL, SMALL, MEDIUM} from 'atoms/MetroText/MetroText';
import {primary} from 'src/colors';

const InfoList = styled.View`
  padding: 0 15px;
`;

const InfoItem = styled.View`
  margin-bottom: 25px;
`;

const BodyText = styled(MetroText)`
  margin: 10px 0;
`;

const Open = styled.TouchableOpacity``;

const OpenText = styled(MetroText)`
  text-decoration: underline;
`;

const infoData = [
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

const InfoSection = () => {
  return (
    <InfoList>
      {infoData.map(({title, body, open, openAction}) => (
        <InfoItem key={title}>
          <MetroText size={SMALL}>{title}</MetroText>
          <BodyText size={EXTRA_SMALL} weight={MEDIUM}>
            {body}
          </BodyText>
          <Open onPress={openAction}>
            <OpenText size={EXTRA_SMALL} weight={MEDIUM} color={primary}>
              {open}
            </OpenText>
          </Open>
        </InfoItem>
      ))}
    </InfoList>
  );
};

export default InfoSection;
