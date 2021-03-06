import React from 'react';
import styled from 'styled-components/native';
import TimeList from 'molecules/TimeList/TimeList';
import MetroText, {REGULAR, INPUT} from 'atoms/MetroText/MetroText';
import {Dimensions} from 'react-native';
import RefreshIcon from 'assets/svg/refresh.svg';
import {useDispatch, useSelector} from 'react-redux';
import {loadData} from 'src/actions/api_actions';
import {useNetInfo} from '@react-native-community/netinfo';
import {displayNotification} from 'src/hooks/useNotification';
import {light_grey, grey} from 'src/colors';

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

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TimeSection = () => {
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

  const TimeSectionWrapper = styled.View`
    padding: 10px 15px 0 15px;
    margin-left: -15px;
    width: ${Dimensions.get('window').width}px;
    flex: 1;
    border: 0 solid ${grey};
    background-color: ${light_grey};
    border-top-width: 1px;
  `;

  return (
    <TimeSectionWrapper>
      <Header>
        <MetroText size={REGULAR}>Terminarz</MetroText>
        <StatusBox onPress={handlePress}>
          <MetroText size={INPUT}>
            Stan na {hours}:{minutes > 9 ? minutes : '0' + minutes}
          </MetroText>
          <RefreshBox>
            <RefreshIcon width={11} height={11} />
          </RefreshBox>
        </StatusBox>
      </Header>
      <TimeList />
    </TimeSectionWrapper>
  );
};

export default TimeSection;
