import React from 'react';
import styled from 'styled-components/native';
import Calendar from 'molecules/Calendar/Calendar';
import Icon, {CALENDAR_SMALL} from 'atoms/Icon/Icon';
import MetroText, {
  REGULAR,
  EXTRA_BOLD,
  EXTRA_SMALL,
} from 'atoms/MetroText/MetroText';
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
  text-align: left;
`;

const EditCalendar = styled.TouchableOpacity`
  width: 170px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const EditCalendarText = styled(MetroText)`
  text-decoration: underline;
`;

const CalendarSection = () => {
  const {date, month} = getToday();
  return (
    <Wrapper>
      <TitleText size={REGULAR}>
        {date} {month}
      </TitleText>
      <EditCalendar>
        <EditCalendarText size={EXTRA_SMALL} weight={EXTRA_BOLD}>
          Edytuj kalendarz
        </EditCalendarText>
        <Icon type={CALENDAR_SMALL} />
      </EditCalendar>
      <Calendar />
    </Wrapper>
  );
};

export default CalendarSection;
