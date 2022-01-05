import React, {useState} from 'react';
import styled from 'styled-components/native';
import TimeList from 'molecules/TimeList/TimeList';
import MetroText, {REGULAR, INPUT} from 'atoms/MetroText/MetroText';
import {Dimensions} from 'react-native';
import RefreshIcon from 'assets/svg/refresh.svg';
import {useDispatch, useSelector} from 'react-redux';
import {loadData} from 'src/actions/api_actions';
import {useNetInfo} from '@react-native-community/netinfo';
import {displayNotification} from 'src/hooks/useNotification';
import {light_grey} from 'src/colors';

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
  const [height, setHeight] = useState(0);

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
    background-color: ${light_grey};
    height: ${height}px;
  `;

  const getHeight = ({
    nativeEvent: {
      layout: {y},
    },
  }) => {
    setHeight(Dimensions.get('window').height - y - 70);
  };

  return (
    <TimeSectionWrapper onLayout={getHeight}>
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
      <TimeList height={height} />
    </TimeSectionWrapper>
  );
};

export default TimeSection;
