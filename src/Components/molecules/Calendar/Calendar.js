import React, {useState} from 'react';
import styled from 'styled-components/native';

import CalendarCard from 'atoms/CalendarCard/CalendarCard';

import getDateList from 'src/Utils/getDateList';

const CalendarBox = styled.View`
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  padding: 0 10px;
`;

const Calendar = () => {
  const [dateList, setDateList] = useState(getDateList());

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
