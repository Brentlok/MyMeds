import React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-native';
import Button from 'atoms/Button/Button';
import MetroText, {BIG} from 'atoms/MetroText/MetroText';
import HorizontalLine from 'atoms/HorizontalLine/HorizontalLine';

const StartPanel = () => {
  const history = useHistory();
  const StartPanelWrapper = styled.View`
    margin-top: 150px;
  `;
  const Title = styled(MetroText)`
    margin-bottom: 20px;
    text-align: center;
  `;
  return (
    <StartPanelWrapper>
      <Title size={BIG}>Załóż konto już teraz!</Title>
      <Button
        onPress={() => history.push('/start/register')}
        primary
        value="Załóż konto"
      />
      <HorizontalLine text={'juz mam konto'} />
      <Button
        onPress={() => history.push('/start/login')}
        secondary
        value="Zaloguj się"
      />
    </StartPanelWrapper>
  );
};

export default StartPanel;
