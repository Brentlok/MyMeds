import React from 'react';
import styled from 'styled-components/native';
import MetroText, {
  SMALL,
  EXTRA_BOLD,
  MEDIUM,
  EXTRA_SMALL,
} from 'atoms/MetroText/MetroText';
import LinearGradient from 'react-native-linear-gradient';

const TimeItem = ({last, active, data}) => {
  const TimeItemWrapper = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px 5px;
    border: 0px solid #cdcdcd;
    ${() => !last && !active && 'border-bottom-width: 3px;'}
  `;

  const MedTimeTitle = styled(MetroText)`
    border: 0px solid #c4c4c4;
    border-right-width: 2px;
    width: 20%;
    height: 100%;
    line-height: 60px;
  `;

  const Meds = styled.View`
    width: 80%;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  `;

  const MedTitle = styled(MetroText)`
    width: 100%;
    text-align: left;
  `;

  const MedQuantity = styled(MetroText)`
    text-align: left;
  `;

  const MedTime = styled(MetroText)`
    text-align: right;
    padding-right: 10px;
  `;

  const BorderGradient = styled(LinearGradient)`
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 3px;
  `;

  const {
    time: {hours, minutes},
    medsList,
  } = data;

  return (
    <TimeItemWrapper>
      <MedTimeTitle size={SMALL} weight={EXTRA_BOLD}>
        {hours}:{minutes}
      </MedTimeTitle>
      <Meds>
        <MedTitle weight={EXTRA_BOLD} size={SMALL}>
          {medsList[0].name}
        </MedTitle>
        <MedQuantity weight={MEDIUM} size={EXTRA_SMALL}>
          {medsList[0].quantity} {medsList[0].quantityType}
        </MedQuantity>
        <MedTime weight={MEDIUM} size={EXTRA_SMALL}>
          {hours}:{minutes} - {parseInt(hours, 10) + 1}:{minutes}
        </MedTime>
      </Meds>
      {active && (
        <BorderGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#17C79A', '#00FFBE']}
        />
      )}
    </TimeItemWrapper>
  );
};

export default TimeItem;
