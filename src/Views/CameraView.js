import React, {useRef} from 'react';
import {Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styled from 'styled-components/native';

const Scaner = styled(RNCamera)`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
  position: absolute;
  top: 0;
  left: 0;
  elevation: 100;
`;

const CameraView = ({history}) => {
  const cameraRef = useRef(null);
  const handleScan = ({data}) => {
    history.push(`/add/${data}`);
  };

  return (
    <Scaner
      captureAudio={false}
      ref={cameraRef}
      defaultTouchToFocus
      onBarCodeRead={handleScan}
    />
  );
};

export default CameraView;
