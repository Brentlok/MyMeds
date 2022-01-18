import React from 'react';
import styled from 'styled-components/native';

import AccountSection from 'organisms/AccountSection/AccountSection';

const AccountWrapper = styled.View`
  padding: 30px 15px;
`;

const AccountView = () => {
  return (
    <AccountWrapper>
      <AccountSection />
    </AccountWrapper>
  );
};

export default AccountView;
