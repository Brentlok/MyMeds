import React from 'react';
import styled from 'styled-components/native';
import Icon, {PERSON_BIG} from 'atoms/Icon/Icon';
import OptionList from 'molecules/OptionList/OptionList';

const AccountSectionWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AccountSection = () => {
  return (
    <AccountSectionWrapper>
      <Icon type={PERSON_BIG} />
      <OptionList />
    </AccountSectionWrapper>
  );
};

export default AccountSection;
