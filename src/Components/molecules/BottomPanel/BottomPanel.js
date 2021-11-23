import React from 'react';
import styled from 'styled-components/native';
import Icon, {HOME, CALENDAR, SETTINGS} from 'atoms/Icon/Icon';
import {addNotification} from 'src/Utils/useNotification';

const PanelWrapper = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border: 0px solid #cdcdcd;
  border-top-width: 1px;
  padding: 40px;
`;

const TopPanel = () => {
  return (
    <PanelWrapper>
      <Icon
        onPress={() =>
          addNotification('Tytuł powiadomienia', 'Opis powiadomienia')
        }
        type={CALENDAR}
      />
      <Icon type={HOME} />
      <Icon type={SETTINGS} />
    </PanelWrapper>
  );
};

export default TopPanel;
