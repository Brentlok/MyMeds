import React from 'react';
import styled from 'styled-components/native';
import TimeItem from 'atoms/TimeItem/TimeItem';
import {Dimensions} from 'react-native';

const TimeList = () => {
  const TimeListWrapper = styled.ScrollView`
    width: ${Dimensions.get('window').width - 30}px;
    margin: 0 auto 80px auto;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background-color: #f5f5f5;
  `;
  return (
    <TimeListWrapper>
      <TimeItem active />
      <TimeItem />
      <TimeItem last />
    </TimeListWrapper>
  );
};

export default TimeList;
