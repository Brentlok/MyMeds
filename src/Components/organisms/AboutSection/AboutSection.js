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
  "Odpowiednia, stała pora przyjmowania leków gwarantuje ich skuteczność. Dla osób, które przyjmują ich dużo, regularność może być szczególnie trudna. Chcieliśmy zwrócić uwagę na ten problem i pomóc wszystkim, których on dotyka, zarówno starszym jak i młodszym, więc stworzyliśmy aplikacje - ,,MyMeds''. Ma ona na celu ułatwienie systematyczności osobom, które przyjmują leki/suplementy.";

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
