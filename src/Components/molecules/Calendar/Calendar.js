import React from 'react';
import styled from 'styled-components/native';

import CalendarCard from 'atoms/CalendarCard/CalendarCard';

const CalendarBox = styled.View`
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  padding: 0 10px;
`;

const Calendar = () => {
  return (
    <CalendarBox>
      <CalendarCard date={5} />
      <CalendarCard date={6} />
      <CalendarCard date={7} active />
      <CalendarCard date={8} />
      <CalendarCard date={7} />
    </CalendarBox>
  );
};

export default Calendar;
