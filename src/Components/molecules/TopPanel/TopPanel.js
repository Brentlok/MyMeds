import React from 'react';
import styled from 'styled-components/native';
import Icon, {LOGO, INFO} from 'atoms/Icon/Icon';
import {white} from 'src/colors';
import {useHistory} from 'react-router-native';

const PanelWrapper = styled.View`
  width: 100%;
  height: 70px;
  background-color: ${white};
  elevation: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Info = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopPanel = () => {
  const history = useHistory();
  return (
    <PanelWrapper>
      <Icon type={LOGO} />
      <Info onPress={() => history.push('/info')}>
        <Icon type={INFO} />
      </Info>
    </PanelWrapper>
  );
};

export default TopPanel;
