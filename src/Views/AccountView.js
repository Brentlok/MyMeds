import React from 'react';
import styled from 'styled-components/native';

import AccountSection from 'organisms/AccountSection/AccountSection';
import AboutSection from 'organisms/AboutSection/AboutSection';

const AccountWrapper = styled.View`
  padding: 50px 15px;
`;

const AccountView = () => {
  return (
    <AccountWrapper>
      <AccountSection />
      <AboutSection />
    </AccountWrapper>
  );
};

export default AccountView;
