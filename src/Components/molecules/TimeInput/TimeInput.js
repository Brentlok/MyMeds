import React, {memo} from 'react';
import MetroText, {MEDIUM, EXTRA_SMALL} from 'atoms/MetroText/MetroText';
import Hour from 'atoms/Hour/Hour';

const TimeInput = ({getValue}) => (
  <>
    <MetroText weight={MEDIUM} size={EXTRA_SMALL}>
      Podaj godzinę...
    </MetroText>
    <Hour ref={getValue} />
  </>
);

export default memo(TimeInput);
