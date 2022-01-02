import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Calendar from 'molecules/Calendar/Calendar';
import MetroText, {REGULAR} from 'atoms/MetroText/MetroText';
import {getToday} from 'src/Utils/getDate';

const Wrapper = styled.View`
  padding: 20px 15px;
  border: 0 solid #d1d1d1;
  border-bottom-width: 2px;
`;

const Gradient = styled(LinearGradient)`
  height: 100%;
  width: 700px;
  position: absolute;
  top: 0;
  left: 0;
`;

const TitleText = styled(MetroText)`
  text-align: center;
`;

const CalendarSection = () => {
  const {date, month} = getToday();

  return (
    <Wrapper>
      <Gradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#F0EDED', '#FFFFFF']}
      />
      <TitleText size={REGULAR}>
        {date} {month}
      </TitleText>
      <Calendar />
    </Wrapper>
  );
};

export default CalendarSection;
