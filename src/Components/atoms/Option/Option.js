import React from 'react';
import styled from 'styled-components/native';
import MetroText, {EXTRA_SMALL} from 'atoms/MetroText/MetroText';
import Icon, {ARROW} from 'atoms/Icon/Icon';
import {light_grey, grey} from 'src/colors';

const OptionBox = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const IconBox = styled.View`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  background-color: ${light_grey};
  border: 1px solid ${grey};
  border-radius: 5px;
`;

const Arrow = styled.View`
  position: absolute;
  right: 0;
`;

const Option = ({name, icon, active, action}) => {
  return (
    <OptionBox key={name} onPress={action}>
      <IconBox>
        <Icon type={icon} active={active} />
      </IconBox>
      {active && (
        <Arrow>
          <Icon type={ARROW} />
        </Arrow>
      )}
      <MetroText size={EXTRA_SMALL}>{name}</MetroText>
    </OptionBox>
  );
};

export default Option;
