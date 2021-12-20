import React from 'react';
import styled from 'styled-components/native';
import MetroText, {
  SMALL,
  EXTRA_BOLD,
  MEDIUM,
  EXTRA_SMALL,
  DARK_GREY,
} from 'atoms/MetroText/MetroText';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon, {OPEN_MODAL, RING} from 'atoms/Icon/Icon';
import {useDispatch} from 'react-redux';
import {changeModalTakenOpen} from 'src/actions';

const TimeItem = ({last, active, data}) => {
  const dispatch = useDispatch();

  const openModal = (type, item) => {
    dispatch(changeModalTakenOpen(type, item));
  };

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
    text-align: center;
    width: 20%;
  `;

  const Meds = styled.View`
    border: 0px solid #c4c4c4;
    border-left-width: 2px;
    width: 80%;
    padding: 0 30px 0 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  `;

  const MedsText = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    padding-right: 40px;
  `;

  const MedItemWrapper = styled.Pressable`
    display: flex;
    flex-direction: column;
  `;

  const MedTitle = styled(MetroText)`
    width: 100%;
  `;

  const BorderGradient = styled(LinearGradient)`
    width: ${Dimensions.get('window').width.toFixed()}px;
    position: absolute;
    bottom: 0;
    height: 3px;
  `;

  const {hour, list} = data;

  return (
    <TimeItemWrapper>
      <MedTimeTitle size={SMALL} weight={EXTRA_BOLD}>
        {hour}:00
      </MedTimeTitle>
      <Meds>
        <MedsText>
          {list.map(item => (
            <MedItemWrapper
              onPress={() => openModal('delete', item)}
              key={item.name}>
              <MedTitle weight={EXTRA_BOLD} size={SMALL}>
                {item.name}
              </MedTitle>
              <MetroText weight={MEDIUM} size={EXTRA_SMALL} color={DARK_GREY}>
                {item.quantity}{' '}
                {item.quantity_type === 'amount' ? 'szt.' : item.quantity_type}
              </MetroText>
            </MedItemWrapper>
          ))}
        </MedsText>
        <Icon
          onPress={() => openModal('taken')}
          type={active ? OPEN_MODAL : RING}
        />
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
