import React from 'react';
import styled from 'styled-components/native';
import Icon, {TOP_MENU, LOGO, PERSON} from 'atoms/Icon/Icon';

const PanelWrapper = styled.View`
  width: 100%;
  height: 120px;
  background-color: #f5f5f5;
  elevation: 6;
  padding: 20px 30px 20px 20px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const TopPanel = () => {
  return (
    <PanelWrapper>
      <Icon type={TOP_MENU} />
      <Icon type={LOGO} />
      <Icon type={PERSON} />
    </PanelWrapper>
  );
};

export default TopPanel;
