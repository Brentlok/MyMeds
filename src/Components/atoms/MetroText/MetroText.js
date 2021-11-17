import styled from 'styled-components/native';

export const SEMI_BOLD = 'SEMI_BOLD';
export const BOLD = 'BOLD';
export const EXTRA_BOLD = 'EXTRA_BOLD';

export const EXTRA_SMALL = 'EXTRA_SMALL';
export const SMALL = 'SMALL';
export const MEDIUM = 'MEDIUM';
export const REGULAR = 'REGULAR';
export const BIG = 'BIG';
export const EXTRA_BIG = 'EXTRA_BIG';

export const LIGHT_GREY = '#8B8B8B';
export const DARK_GREY = '#545454';
export const WHITE = 'white';

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
  text-align: center;
  color: ${({color}) => (color ? color : 'black')};
  font-family: Metropolis-${({weight}) => getFontWeight(weight)};
  font-size: ${({size}) => getFontSize(size)}px;
`;

export default MetroText;
