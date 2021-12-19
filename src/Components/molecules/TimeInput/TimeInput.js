import React, {useState} from 'react';
import MetroText, {MEDIUM, EXTRA_SMALL} from 'atoms/MetroText/MetroText';
import styled from 'styled-components';
import Hour from 'atoms/Hour/Hour';

const TimeInput = ({getValue}) => {
  return (
    <>
      <MetroText weight={MEDIUM} size={EXTRA_SMALL}>
        Podaj godzinę...
      </MetroText>
      <Hour ref={getValue} />
    </>
  );
};

export default TimeInput;
