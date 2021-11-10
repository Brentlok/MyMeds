import React, {useState} from 'react';
import styled from 'styled-components/native';

import CalendarCard from 'atoms/CalendarCard/CalendarCard';

import {getDateList} from 'src/Utils/getDate';

const CalendarBox = styled.View`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 20px;
`;

const Calendar = () => {
  const [dateList, setDateList] = useState(getDateList());
  // get array of dates [today - 2, today - 1, today, today +1, today + 2]
  // each date object has date and month properties
  return (
    <CalendarBox>
      {dateList.map(({date, month}, index) => (
        <CalendarCard
          date={date}
          month={month}
          active={index === 2}
          key={date}
        />
      ))}
    </CalendarBox>
  );
};

export default Calendar;
