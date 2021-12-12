import React, {useState} from 'react';
import InputWithList from 'atoms/InputWithList/InputWithList';
import styled from 'styled-components/native';
import MetroText, {MEDIUM, EXTRA_SMALL} from 'atoms/MetroText/MetroText';

const AmountInput = ({getValue}) => {
  const AmountWrapper = styled.View`
    margin: 15px 0 40px 0;
  `;
  return (
    <>
      <MetroText weight={MEDIUM} size={EXTRA_SMALL}>
        Podaj ilość...
      </MetroText>
      <AmountWrapper>
        <InputWithList ref={getValue} number options={['szt.', 'ml', 'g']} />
      </AmountWrapper>
    </>
  );
};

export default AmountInput;
