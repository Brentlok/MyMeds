import React, {useState} from 'react';
import styled from 'styled-components/native';
import TimeList from 'molecules/TimeList/TimeList';
import MetroText, {REGULAR} from 'atoms/MetroText/MetroText';
import {Dimensions} from 'react-native';

const TimeSection = () => {
  const [height, setHeight] = useState(0);

  const TimeSectionWrapper = styled.View`
    padding-top: 10px;
    background-color: #f5f5f5;
    height: ${height}px;
  `;

  const Title = styled(MetroText)`
    text-align: center;
  `;

  const getHeight = ({
    nativeEvent: {
      layout: {y},
    },
  }) => {
    setHeight(Dimensions.get('window').height - y - 70);
  };

  return (
    <TimeSectionWrapper onLayout={getHeight}>
      <Title size={REGULAR}>Twój terminarz</Title>
      <TimeList height={height} />
    </TimeSectionWrapper>
  );
};

export default TimeSection;
