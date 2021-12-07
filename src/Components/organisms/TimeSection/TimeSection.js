import React from 'react';
import styled from 'styled-components/native';
import TimeList from 'molecules/TimeList/TimeList';
import MetroText, {REGULAR, EXTRA_BOLD} from 'atoms/MetroText/MetroText';

const TimeSection = () => {
  const TimeSectionTop = styled.View`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  `;
  const TimeSectionTitleText = styled(MetroText)`
    text-align: left;
    padding-left: 15px;
    margin: 20px 0 15px 0;
  `;
  return (
    <>
      <TimeSectionTop>
        <TimeSectionTitleText size={REGULAR} weight={EXTRA_BOLD}>
          Twój terminarz
        </TimeSectionTitleText>
      </TimeSectionTop>
      <TimeList />
    </>
  );
};

export default TimeSection;
