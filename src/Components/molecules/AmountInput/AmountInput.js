import React from 'react';
import List from 'atoms/List/List';
import Input from 'atoms/Input/Input';
import styled from 'styled-components/native';

const AmountInput = () => {
  const AmountWrapper = styled.View`
    display: flex;
    flex-direction: row;
    border: 2px solid #1f1f1f;
    border-radius: 9px;
    max-width: 140px;
    height: 50px;
    background-color: #f5f5f5;
  `;
  const Line = styled.View`
    width: 2px;
    background-color: #1f1f1f;
    height: 48px;
  `;
  return (
    <AmountWrapper>
      <Input />
      <Line />
      <List openText="szt." options={['ml', 'g']} />
    </AmountWrapper>
  );
};

export default AmountInput;
