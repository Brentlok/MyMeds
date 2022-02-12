import React, {memo} from 'react';
import styled from 'styled-components';
import Input from 'atoms/Input/Input';
import MetroText, {MEDIUM, EXTRA_SMALL} from 'atoms/MetroText/MetroText';
import ScannerIcon from 'assets/svg/scan.svg';
import {useHistory} from 'react-router-native';
import SuggestionsInput from '../../atoms/SuggestionsInput/SuggestionsInput';

const TitleInput = ({
  passRef,
  title,
  password,
  autoComplete,
  scaner,
  addMed,
}) => {
  const history = useHistory();

  const Title = styled(MetroText)`
    margin-bottom: 10px;
  `;

  const TitleInputWrapper = styled.View`
    margin-bottom: 15px;
  `;

  const InputScanner = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  const RunScanner = styled.TouchableOpacity``;

  return (
    <TitleInputWrapper>
      <Title weight={MEDIUM} size={EXTRA_SMALL}>
        {title}
      </Title>
      {scaner ? (
        <InputScanner>
          {addMed ? (
            <SuggestionsInput
              password={password}
              ref={passRef}
              autoComplete={autoComplete}
              scaner={scaner}
            />
          ) : (
            <Input
              password={password}
              ref={passRef}
              autoComplete={autoComplete}
              scaner={scaner}
            />
          )}
          <RunScanner onPress={() => history.push('/camera')}>
            <ScannerIcon />
          </RunScanner>
        </InputScanner>
      ) : (
        <Input
          password={password}
          ref={passRef}
          autoComplete={autoComplete}
          scaner={scaner}
        />
      )}
    </TitleInputWrapper>
  );
};

export default memo(TitleInput);
