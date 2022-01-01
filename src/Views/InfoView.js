import React from 'react';
import styled from 'styled-components/native';
import InfoSection from 'organisms/InfoSection/InfoSection';
import MetroText, {REGULAR} from 'atoms/MetroText/MetroText';

const InfoTitle = styled(MetroText)`
  margin: 10px 0 15px 0;
  text-align: center;
`;

const InfoView = () => {
  return (
    <>
      <InfoTitle size={REGULAR}>Informacje</InfoTitle>
      <InfoSection />
    </>
  );
};

export default InfoView;
