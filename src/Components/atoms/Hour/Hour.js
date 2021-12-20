import React, {forwardRef, useState, useImperativeHandle} from 'react';
import styled from 'styled-components/native';
import MetroText, {INPUT, MEDIUM} from 'atoms/MetroText/MetroText';

const HourWrapper = styled.View`
  margin-top: 15px;
  width: 140px;
  height: 50px;
  background-color: #f5f5f5;
  border-radius: 9px;
  border: 2px solid #1f1f1f;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const IconBox = styled.TouchableOpacity`
  width: 26px;
  height: 26px;
`;

const Line = styled.View`
  position: absolute;
  top: 11.5px;
  width: 16px;
  height: 3px;
  border-radius: 10px;
  background-color: #1f1f1f;
`;

const Minus = styled(Line)`
  right: 0;
`;

const Plus1 = styled(Line)`
  left: 0;
`;

const Plus2 = styled(Plus1)`
  transform: rotate(90deg);
`;

const getNowHour = () => {
  const date = new Date();
  return date.getHours();
};

const Hour = forwardRef((props, ref) => {
  const [hour, setHour] = useState(getNowHour());

  const changeHour = value => {
    const newHour = hour + value;
    if (newHour === 0) {
      setHour(24);
      return;
    }
    if (newHour === 25) {
      setHour(1);
      return;
    }
    setHour(newHour);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => hour,
  }));

  return (
    <HourWrapper>
      <IconBox onPress={() => changeHour(-1)}>
        <Minus />
      </IconBox>
      <MetroText size={INPUT} weight={MEDIUM}>
        {hour}:00
      </MetroText>
      <IconBox onPress={() => changeHour(1)}>
        <Plus1 />
        <Plus2 />
      </IconBox>
    </HourWrapper>
  );
});

export default Hour;
