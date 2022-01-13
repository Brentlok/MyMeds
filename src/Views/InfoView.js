import React from 'react';
import styled from 'styled-components/native';
import InfoSection from 'organisms/InfoSection/InfoSection';
import MetroText, {REGULAR, INPUT, MEDIUM} from 'atoms/MetroText/MetroText';
import {Dimensions} from 'react-native';

const InfoTitle = styled(MetroText)`
  margin: 30px 0;
  text-align: center;
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

const InfoView = () => {
  return (
    <>
      <InfoTitle size={REGULAR}>Informacje</InfoTitle>
      <InfoSection />
      <License onPress={() => null}>
        <LicenseText size={INPUT} weight={MEDIUM}>
          Tło plik wektorowy utworzone przez freepik - pl.freepik.com
        </LicenseText>
      </License>
    </>
  );
};

export default InfoView;
