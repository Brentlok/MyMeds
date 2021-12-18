import React, {memo} from 'react';
import styled from 'styled-components';
import Input from 'atoms/Input/Input';
import MetroText, {MEDIUM, EXTRA_SMALL} from 'atoms/MetroText/MetroText';

const TitleInput = memo(({passRef, title, password}) => {
  const Title = styled(MetroText)`
    margin-bottom: 15px;
  `;
  const TitleInputWrapper = styled.View`
    margin-bottom: 25px;
  `;
  return (
    <TitleInputWrapper>
      <Title weight={MEDIUM} size={EXTRA_SMALL}>
        {title}
      </Title>
      <Input password={password} border ref={passRef} />
    </TitleInputWrapper>
  );
});

export default TitleInput;