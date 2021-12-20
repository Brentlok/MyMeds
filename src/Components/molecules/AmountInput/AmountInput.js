import React, {memo} from 'react';
import MetroText, {MEDIUM, EXTRA_SMALL} from 'atoms/MetroText/MetroText';
import Amount from 'atoms/Amount/Amount';

const AmountInput = memo(({getValue}) => (
  <>
    <MetroText weight={MEDIUM} size={EXTRA_SMALL}>
      Podaj ilość...
    </MetroText>
    <Amount ref={getValue} />
  </>
));

export default AmountInput;
