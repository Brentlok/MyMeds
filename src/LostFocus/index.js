import React from 'react';
import styled from 'styled-components';
import {Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {changeInputFocus} from 'src/actions';

const Opacity = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
  position: absolute;
  top: 0;
  left: 0;
`;

const LostFocus = () => {
  const dispatch = useDispatch();

  return <Opacity onPress={() => dispatch(changeInputFocus(false))} />;
};

export default LostFocus;
