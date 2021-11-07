import React from 'react';
import styled from 'styled-components/native';

import LinearGradient from 'react-native-linear-gradient';

const CalendarCard = ({active, date}) => {
  const CardBox = styled.View`
    overflow: hidden;
    padding: 10px;
    width: 15%;
    height: 120px;
    display: flex;
    justify-content: ${() => (active ? 'space-between' : 'flex-end')};
    flex-direction: column;
    border-radius: 10px;
    ${() => !active && 'border: 1px solid #d1d1d1'}
  `;

  const CardText = styled.Text`
    text-align: center;
    font-size: ${({date}) => (date ? '35' : '16')}px;
    color: ${() => (active ? '#FFFFFF' : '#8B8B8B')};
    ${({date}) =>
      date &&
      `
        position: absolute;
        top: 50%;
        margin-top: -20px;
        left: 50%;
    `};
    font-family: Metropolis-${({font = 'ExtraBold'}) => font};
  `;

  const Gradient = styled(LinearGradient)`
    height: 120px;
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
      {active && <CardText font="Bold">Dziś</CardText>}
      <CardText date>{date}</CardText>
      <CardText>Lis</CardText>
    </CardBox>
  );
};

export default CalendarCard;
