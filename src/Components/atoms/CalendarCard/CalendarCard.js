import React from 'react';
import styled from 'styled-components/native';

import LinearGradient from 'react-native-linear-gradient';
import MetroText, {
  EXTRA_SMALL,
  SMALL,
  MEDIUM,
  BIG,
  EXTRA_BIG,
  BOLD,
  EXTRA_BOLD,
  WHITE,
  LIGHT_GREY,
} from 'atoms/MetroText/MetroText';

const CalendarCard = ({active, date, month}) => {
  const isMonth = 'isMonth';
  const isDay = 'isDay';
  const isToday = 'isToday';

  const CardBox = styled.View`
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

  const CardText = styled(MetroText)`
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
      {active && (
        <CardText
          type={isToday}
          color={active ? WHITE : LIGHT_GREY}
          size={SMALL}>
          Dziś
        </CardText>
      )}
      <CardText
        type={isDay}
        weight={EXTRA_BOLD}
        color={active ? WHITE : LIGHT_GREY}
        size={active ? EXTRA_BIG : BIG}>
        {date}
      </CardText>
      <CardText
        type={isMonth}
        weight={active ? BOLD : EXTRA_BOLD}
        color={active ? WHITE : LIGHT_GREY}
        size={active ? MEDIUM : EXTRA_SMALL}>
        {month}
      </CardText>
    </CardBox>
  );
};

export default CalendarCard;
