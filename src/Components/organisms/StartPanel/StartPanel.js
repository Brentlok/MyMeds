import React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-native';
import {Dimensions} from 'react-native';
import Button from 'atoms/Button/Button';
import MetroText, {BIG} from 'atoms/MetroText/MetroText';
import HorizontalLine from 'atoms/HorizontalLine/HorizontalLine';
import Icon from 'assets/svg/start.svg';

const StartPanelWrapper = styled.View`
  width: ${Dimensions.get('window').width - 30}px;
  height: ${Dimensions.get('window').height}px;
  display: flex;
  justify-content: center;
  position: absolute;
  padding-bottom: 50px;
  left: 15px;
`;

const StartIcon = styled(Icon)`
  position: absolute;
  bottom: 0;
  left: -15px;
`;

const Title = styled(MetroText)`
  margin-bottom: 20px;
  text-align: center;
`;

const StartPanel = () => {
  const history = useHistory();

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
      <StartIcon
        pointerEvents="none"
        width={Dimensions.get('window').width}
        height={0.54 * Dimensions.get('window').width}
      />
    </StartPanelWrapper>
  );
};

export default StartPanel;
