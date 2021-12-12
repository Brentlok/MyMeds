import React, {useState} from 'react';
import List from 'atoms/List/List';
import ClockIcon from 'assets/svg/clock.svg';
import styled from 'styled-components/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MetroText, {MEDIUM, EXTRA_SMALL} from 'atoms/MetroText/MetroText';

const TimeInput = ({getValue}) => {
  const [timeList, setTimeList] = useState(['8:00', '12:00']);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const handleConfirm = time => {
    const newTime = `${time.getHours()}:${time.getMinutes()}`;
    const newTimeList = [newTime, ...timeList];
    setTimeList(newTimeList);
    setIsTimePickerVisible(false);
  };

  const TimeInputWrapper = styled.View`
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  const Clock = styled.TouchableOpacity`
    margin-left: 15px;
  `;

  return (
    <>
      <MetroText weight={MEDIUM} size={EXTRA_SMALL}>
        Podaj godzinę...
      </MetroText>
      <TimeInputWrapper>
        <List ref={getValue} options={timeList} />
        <Clock onPress={() => setIsTimePickerVisible(true)}>
          <ClockIcon />
        </Clock>
      </TimeInputWrapper>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => setIsTimePickerVisible(false)}
      />
    </>
  );
};

export default TimeInput;
