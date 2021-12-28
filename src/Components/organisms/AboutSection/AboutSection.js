import React from 'react';
import styled from 'styled-components/native';
import Icon, {LOGO_BIG} from 'atoms/Icon/Icon';
import MetroText, {EXTRA_SMALL, MEDIUM} from 'atoms/MetroText/MetroText';

const AboutSectionWrapper = styled.View`
  margin-top: 55px;
  display: flex;
  align-items: center;
`;

const AboutText = styled(MetroText)`
  margin-top: 35px;
`;

const aboutText =
  'The external scars tell only part of the story. Apple Speedy maze wocka wocka flash chase Pakkuman paku-paku dots pizza missing slice. Orange fickle blue guy maze chase. Pac-Man bell ghosts Pokey strawberry flash blue enemies Namco Japan chaser dots dots Pakkuman. Ghosts dots cherry Blinky Pac-Man Power Pellets fruit. He had a hidden stash underneath the floorboards in the back room of the house.';

const AboutSection = () => {
  return (
    <AboutSectionWrapper>
      <Icon type={LOGO_BIG} />
      <AboutText size={EXTRA_SMALL} weight={MEDIUM}>
        {aboutText}
      </AboutText>
    </AboutSectionWrapper>
  );
};

export default AboutSection;
