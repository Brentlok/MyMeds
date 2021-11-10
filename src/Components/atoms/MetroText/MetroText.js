import styled from 'styled-components/native';

export const BOLD = 'bold';
export const EXTRA_BOLD = 'extra-bold';

export const EXTRA_SMALL = 'extra-small';
export const SMALL = 'small';
export const MEDIUM = 'medium';
export const REGULAR = 'regular';
export const BIG = 'big';
export const EXTRA_BIG = 'extra-big';

export const LIGHT_GREY = '#8B8B8B';
export const DARK_GREY = '#545454';
export const WHITE = 'white';

const getFontWeight = (weight = BOLD) => {
  switch (weight) {
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
