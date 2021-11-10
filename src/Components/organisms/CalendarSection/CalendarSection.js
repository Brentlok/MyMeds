import React from 'react';
import styled from 'styled-components/native';
import Calendar from 'molecules/Calendar/Calendar';
import Icon from 'atoms/Icon/Icon';
import fontSizes from 'src/Utils/fontSizes';
import {getToday} from 'src/Utils/getDate';

const Wrapper = styled.View`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  padding: 20px 15px;
`;

const Title = styled.Text`
  font-family: Metropolis;
  color: black;
  font-size: ${fontSizes.calendar.title}px;
  font-weight: bold;
  width: 50%;
`;

const EditCalendar = styled.TouchableOpacity`
  width: 155px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const EditCalendarText = styled.Text`
  font-family: Metropolis;
  font-size: ${fontSizes.calendar.edit}px;
  font-weight: bold;
  color: black;
  text-decoration: underline;
`;

const CalendarSection = () => {
  const {date, month} = getToday();
  return (
    <Wrapper>
      <Title>
        {date} {month}
      </Title>
      <EditCalendar>
        <EditCalendarText>Edytuj kalendarz</EditCalendarText>
        <Icon type="calendar-small" />
      </EditCalendar>
      <Calendar />
    </Wrapper>
  );
};

export default CalendarSection;
