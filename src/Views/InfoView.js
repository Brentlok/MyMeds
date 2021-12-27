import React from 'react';
import styled from 'styled-components/native';
import {Linking} from 'react-native';
import MetroText, {
  EXTRA_SMALL,
  SMALL,
  REGULAR,
  MEDIUM,
} from 'atoms/MetroText/MetroText';
import {
  checkPowerManager,
  checkForBatteryPermission,
} from 'src/Utils/powerSettings';

const infoData = [
  {
    title: 'Sprawdź optymalizacje baterii',
    body: 'Optymalizacja baterii nałożona na aplikację może powodować problemy z powiadomieniami o twoich lekach i suplementach.',
    open: 'Sprawdź to ustawienie',
    openAction: checkForBatteryPermission,
  },
  {
    title: 'Sprawdź power manager',
    body: 'Power manager działa podobnie jak optymalizacja baterii, wygląda inaczej w zależności od modelu twojego telefonu.',
    open: 'Sprawdź to ustawienie',
    openAction: checkPowerManager,
  },
  {
    title: 'Pozostałe ustawienia',
    body: 'Warto sprawdzić również inne ustawienia aplikacji, dotyczące powiadomień, dostępu do aparatu, i wielu innych.',
    open: 'Otwórz wszystkie ustawienia',
    openAction: () => Linking.openSettings(),
  },
];

const InfoTitle = styled(MetroText)`
  margin: 35px 0;
  text-align: center;
`;

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

const InfoView = () => {
  return (
    <>
      <InfoTitle size={REGULAR}>Informacje</InfoTitle>
      <InfoList>
        {infoData.map(({title, body, open, openAction}) => (
          <InfoItem key={title}>
            <MetroText size={SMALL}>{title}</MetroText>
            <BodyText size={EXTRA_SMALL} weight={MEDIUM}>
              {body}
            </BodyText>
            <Open onPress={openAction}>
              <OpenText size={EXTRA_SMALL} weight={MEDIUM}>
                {open}
              </OpenText>
            </Open>
          </InfoItem>
        ))}
      </InfoList>
    </>
  );
};

export default InfoView;
