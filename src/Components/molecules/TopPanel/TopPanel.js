import React from 'react';
import styled from 'styled-components/native';
import Icon, {LOGO} from 'atoms/Icon/Icon';
import {white} from 'src/colors';
import {Dimensions} from 'react-native';

const PanelWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  margin: 0 0 25px -15px;
  height: 70px;
  background-color: ${white};
  elevation: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const TopPanel = () => {
  return (
    <PanelWrapper>
      <Icon type={LOGO} />
    </PanelWrapper>
  );
};

export default TopPanel;
