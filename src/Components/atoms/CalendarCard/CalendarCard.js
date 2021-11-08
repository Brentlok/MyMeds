import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import fontSizes from 'src/Utils/fontSizes';

const CalendarCard = ({active, date, month}) => {
  const isMonth = 'isMonth';
  const isDay = 'isDay';
  const isToday = 'isToday';

  const CardBox = styled(active ? View : TouchableOpacity)`
    overflow: hidden;
    padding: 5px 0 15px 0;
    background-color: #fff;
    display: flex;
    width: 60px;
    height: 115px;
    justify-content: ${() => (active ? 'space-between' : 'flex-end')};
    flex-direction: column;
    border-radius: 10px;
    elevation: 4;
    ${() => !active && 'border: 1px solid #d1d1d1'}
  `;

  const getFontSize = type => {
    const {calendarCard} = fontSizes;
    if (active) {
      const activeCalendarCard = calendarCard.active;
      switch (type) {
        case isToday:
          return activeCalendarCard.today;
        case isDay:
          return activeCalendarCard.day;
        case isMonth:
          return activeCalendarCard.month;
      }
    }
    switch (type) {
      case isDay:
        return calendarCard.day;
      case isMonth:
        return calendarCard.month;
    }
  };

  const CardText = styled.Text`
    text-align: center;
    font-size: ${({type}) => getFontSize(type)}px;
    color: ${() => (active ? '#FFFFFF' : '#8B8B8B')};
    font-family: Metropolis-${({type}) => (type === isToday ? 'Bold' : 'ExtraBold')};
    ${({type}) => type === isDay && !active && 'margin-bottom: 10px;'}
    ${({type}) =>
      [isMonth, isDay].includes(type) && active && 'margin-top: -5px;'}
  `;

  const Gradient = styled(LinearGradient)`
    height: 115px;
    width: 500px;
    position: absolute;
    top: 0;
    left: 0;
  `;

  return (
    <CardBox>
      {active && (
        <Gradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#17C79A', '#01FFBE']}
        />
      )}
      {active && <CardText type={isToday}>Dziś</CardText>}
      <CardText type={isDay}>{date}</CardText>
      <CardText type={isMonth}>{month}</CardText>
    </CardBox>
  );
};

export default CalendarCard;
