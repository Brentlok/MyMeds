import React from 'react';
import styled from 'styled-components/native';

import LinearGradient from 'react-native-linear-gradient';

const CalendarCard = ({active, date}) => {
  const CardBox = styled.View`
    overflow: hidden;
    padding: 10px;
    background-color: #fff;
    display: flex;
    width: 15%;
    height: 120px;
    justify-content: ${() => (active ? 'space-between' : 'flex-end')};
    flex-direction: column;
    border-radius: 10px;
    elevation: 4;
    ${() => !active && 'border: 1px solid #d1d1d1'}
  `;

  const CardText = styled.Text`
    text-align: center;
    font-size: ${({isDate}) => (isDate ? '35' : '16')}px;
    color: ${() => (active ? '#FFFFFF' : '#8B8B8B')};
    ${({isDate}) =>
      isDate &&
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
      <CardText isDate>{date}</CardText>
      <CardText>Lis</CardText>
    </CardBox>
  );
};

export default CalendarCard;
