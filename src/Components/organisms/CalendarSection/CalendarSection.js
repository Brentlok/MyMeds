import React from 'react';
import styled from 'styled-components/native';
import Calendar from 'molecules/Calendar/Calendar';
import MetroText, {REGULAR} from 'atoms/MetroText/MetroText';
import {getToday} from 'src/Utils/getDate';

const Wrapper = styled.View`
  padding: 20px 15px;
  border: 0 solid #d1d1d1;
  border-bottom-width: 2px;
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
