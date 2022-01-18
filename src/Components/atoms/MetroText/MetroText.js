import styled from 'styled-components/native';
import {black} from 'src/colors';

export const SEMI_BOLD = 'SEMI_BOLD';
export const BOLD = 'BOLD';
export const EXTRA_BOLD = 'EXTRA_BOLD';

export const INPUT = 'INPUT';
export const EXTRA_SMALL = 'EXTRA_SMALL';
export const SMALL = 'SMALL';
export const MEDIUM = 'MEDIUM';
export const REGULAR = 'REGULAR';
export const BIG = 'BIG';
export const EXTRA_BIG = 'EXTRA_BIG';

const getFontWeight = (weight = BOLD) => {
  switch (weight) {
    case SEMI_BOLD:
      return 'SemiBold';
    case BOLD:
      return 'Bold';
    case EXTRA_BOLD:
      return 'ExtraBold';
    case MEDIUM:
      return 'Medium';
  }
};

const getFontSize = size => {
  switch (size) {
    case INPUT:
      return '15';
    case EXTRA_SMALL:
      return '17';
    case SMALL:
      return '21';
    case MEDIUM:
      return '25';
    case REGULAR:
      return '27';
    case BIG:
      return '31';
    case EXTRA_BIG:
      return '44';
  }
};

const MetroText = styled.Text`
  color: ${({color}) => (color ? color : black)};
  font-family: Metropolis-${({weight}) => getFontWeight(weight)};
  font-size: ${({size}) => getFontSize(size)}px;
  ${({center}) => center && 'text-align: center;'}
  ${({margin}) => margin && `margin: ${margin}`}
`;

export default MetroText;
