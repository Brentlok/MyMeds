import React from 'react';
import styled from 'styled-components/native';
import MetroText, {
  REGULAR,
  EXTRA_SMALL,
  MEDIUM,
  INPUT,
} from 'atoms/MetroText/MetroText';
import Icon, {LOGO_BIG} from 'atoms/Icon/Icon';
import {Dimensions, Linking} from 'react-native';

const Logo = styled.View`
  position: absolute;
  bottom: 140px;
  width: ${Dimensions.get('window').width}px;
  display: flex;
  align-items: center;
`;

const License = styled.TouchableOpacity`
  position: absolute;
  bottom: 80px;
  width: ${Dimensions.get('window').width}px;
`;

const LicenseText = styled(MetroText)`
  text-align: center;
  text-decoration: underline;
`;

const InfoText = styled(MetroText)`
  margin-top: 30px;
`;

const infoText =
  "Odpowiednia, stała pora przyjmowania leków gwarantuje ich skuteczność. Dla osób, które przyjmują ich dużo, regularność może być szczególnie trudna. Chcieliśmy zwrócić uwagę na ten problem i pomóc wszystkim, których on dotyka, zarówno starszym jak i młodszym, więc stworzyliśmy aplikacje - ,,MyMeds''. Ma ona na celu ułatwienie systematyczności osobom, które przyjmują leki/suplementy.";

const InfoView = () => {
  return (
    <>
      <MetroText center size={REGULAR}>
        Informacje o projekcie
      </MetroText>
      <InfoText size={EXTRA_SMALL} weight={MEDIUM}>
        {infoText}
      </InfoText>

      <Logo>
        <Icon type={LOGO_BIG} />
      </Logo>

      <License
        onPress={() => Linking.openURL('https://pl.freepik.com/wektory/logo')}>
        <LicenseText size={INPUT} weight={MEDIUM}>
          Tło plik wektorowy utworzone przez freepik - pl.freepik.com
        </LicenseText>
      </License>
    </>
  );
};

export default InfoView;
