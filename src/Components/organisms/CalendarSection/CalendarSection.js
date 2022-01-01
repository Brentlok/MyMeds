import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Calendar from 'molecules/Calendar/Calendar';
import MetroText, {
  REGULAR,
  SMALL,
  INPUT,
  DARK,
} from 'atoms/MetroText/MetroText';
import {getToday} from 'src/Utils/getDate';
import RefreshIcon from 'assets/svg/refresh.svg';
import {useDispatch, useSelector} from 'react-redux';
import {loadData} from 'src/actions';
import {useNetInfo} from '@react-native-community/netinfo';
import {displayNotification} from 'src/hooks/useNotification';

const Wrapper = styled.View`
  padding: 0 15px;
  border: 0 solid #d1d1d1;
  border-bottom-width: 2px;
`;

const TitleText = styled(MetroText)`
  margin: 15px 0 10px 0;
  text-align: center;
`;

const Gradient = styled(LinearGradient)`
  height: 100%;
  width: 700px;
  position: absolute;
  top: 0;
  left: 0;
`;

const StatusBox = styled.TouchableOpacity`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RefreshBox = styled.View`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarSection = () => {
  const {date, month} = getToday();

  const dispatch = useDispatch();
  const {lastCheckedTime} = useSelector(state => state);
  const {hours, minutes} = lastCheckedTime;

  const {isInternetReachable} = useNetInfo();

  const handlePress = () => {
    if (isInternetReachable) {
      dispatch(loadData());
      return;
    }
    displayNotification(
      'Nie masz połączenia z internetem',
      'Spróbuj ponownie później...',
    );
  };

  return (
    <Wrapper>
      <Gradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#F0EDED', '#FFFFFF']}
      />
      <TitleText size={REGULAR}>Kalendarz</TitleText>
      <MetroText size={SMALL}>
        {date} {month}
      </MetroText>
      <StatusBox onPress={handlePress}>
        <MetroText size={INPUT} color={DARK}>
          Stan na {hours}:{minutes > 9 ? minutes : '0' + minutes}
        </MetroText>
        <RefreshBox>
          <RefreshIcon width={11} height={11} />
        </RefreshBox>
      </StatusBox>
      <Calendar />
    </Wrapper>
  );
};

export default CalendarSection;
