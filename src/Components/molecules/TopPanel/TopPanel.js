import React from 'react';
import styled from 'styled-components/native';
import Icon, {LOGO} from 'atoms/Icon/Icon';

const PanelWrapper = styled.View`
  width: 100%;
  height: 70px;
  background-color: #fff;
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
