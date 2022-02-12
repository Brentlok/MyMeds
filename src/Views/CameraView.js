import React, {useRef} from 'react';
import {Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styled from 'styled-components/native';
import MetroText, {MEDIUM} from 'atoms/MetroText/MetroText';

const Scaner = styled(RNCamera)`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
  position: absolute;
  top: 0;
  left: 0;
  elevation: 100;
`;

const Watermark = styled.View`
  width: ${Dimensions.get('window').width}px;
  position: absolute;
  bottom: 50px;
  left: 0;
  elevation: 101;
`;

const WatermarkText = styled(MetroText)`
  opacity: 0.8;
`;

const CameraView = ({history}) => {
  const cameraRef = useRef(null);
  const handleScan = ({data}) => {
    history.push(`/add/${data}`);
  };

  return (
    <>
      <Scaner
        captureAudio={false}
        ref={cameraRef}
        defaultTouchToFocus
        onBarCodeRead={handleScan}
      />
      <Watermark>
        <WatermarkText size={MEDIUM} center>
          Na tą chwilę skanowanie kodu kreskowego jest obsługiwane tylko dla
          leków
        </WatermarkText>
      </Watermark>
    </>
  );
};

export default CameraView;
