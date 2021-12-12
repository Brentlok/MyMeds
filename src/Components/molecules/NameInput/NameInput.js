import React from 'react';
import styled from 'styled-components';
import Input from 'atoms/Input/Input';
import MetroText, {MEDIUM, EXTRA_SMALL} from 'atoms/MetroText/MetroText';
import ScanIcon from 'assets/svg/scan.svg';
import {useHistory} from 'react-router-native';

const NameInput = ({getValue}) => {
  const history = useHistory();
  const NameInputWrapper = styled.View`
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-bottom: 40px;
  `;

  const ScanWrapper = styled.TouchableOpacity`
    margin-left: 15px;
  `;
  return (
    <>
      <MetroText weight={MEDIUM} size={EXTRA_SMALL}>
        Nazwa leku / suplementu...
      </MetroText>
      <NameInputWrapper>
        <Input border ref={getValue} />
        <ScanWrapper onPress={() => history.push('/camera')}>
          <ScanIcon />
        </ScanWrapper>
      </NameInputWrapper>
    </>
  );
};

export default NameInput;
