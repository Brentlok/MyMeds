import React from 'react';
import styled from 'styled-components/native';
import Calendar from 'molecules/Calendar/Calendar';
import MetroText, {REGULAR} from 'atoms/MetroText/MetroText';
import {getToday} from 'src/Utils/getDate';

const Wrapper = styled.View`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  padding: 25px 15px 0 15px;
`;

const TitleText = styled(MetroText)`
  width: 50%;
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
