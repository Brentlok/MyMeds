import React from 'react';
import styled from 'styled-components/native';
import Calendar from 'molecules/Calendar/Calendar';
import MetroText, {REGULAR} from 'atoms/MetroText/MetroText';
import {getToday} from 'src/Utils/getDate';

const Wrapper = styled.View`
  padding-bottom: 20px;
`;

const TitleText = styled(MetroText)`
  text-align: center;
`;

const CalendarSection = () => {
  const {date, month} = getToday();

  return (
    <Wrapper>
      <TitleText size={REGULAR}>
        {date} {month}
      </TitleText>
      <Calendar />
    </Wrapper>
  );
};

export default CalendarSection;
