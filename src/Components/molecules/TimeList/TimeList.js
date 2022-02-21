import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import TimeItem from 'atoms/TimeItem/TimeItem';
import {useSelector, useDispatch} from 'react-redux';
import {loadData} from 'src/actions/api_actions';
import Icon, {NOTHING, REFRESH, ADD, GREAT} from 'atoms/Icon/Icon';
import MetroText, {
  EXTRA_SMALL,
  SMALL,
  SEMI_BOLD,
} from 'atoms/MetroText/MetroText';
import {useHistory} from 'react-router-native';

const TimeList = () => {
  const [firstActive, setFirstActive] = useState(null);

  const {list, dataLoaded, takenToday, muted, addedForTomorrow} = useSelector(
    state => state,
  );

  const filteredList = list.filter(
    ({hour}) => addedForTomorrow.includes(hour) || !takenToday.includes(hour),
  );

  const dispatch = useDispatch();

  const history = useHistory();

  const TimeListWrapper = styled.ScrollView`
    flex: 1;
  `;

  const NothingWrapper = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
  `;

  const TimeListComponent = list.length ? TimeListWrapper : NothingWrapper;

  const NothingText = styled(MetroText)`
    margin: 15px;
  `;

  useEffect(() => {
    if (!dataLoaded) {
      return;
    }
    for (let i = 0; i < filteredList.length; i++) {
      //if there are some items added for tommorow before first active for today
      if (!addedForTomorrow.includes(filteredList[i].hour)) {
        setFirstActive(i);
        break;
      }
    }
    if (firstActive !== null) {
      return;
    }
    if (!filteredList.length || addedForTomorrow.length) {
      //if list is empty
      setFirstActive(-1);
    }
  }, [addedForTomorrow, dataLoaded, filteredList, firstActive]);

  //wait for api
  return dataLoaded && firstActive !== null ? (
    <TimeListComponent>
      {list.length ? (
        <>
          {filteredList.length ? (
            filteredList.map((item, index) => (
              <TimeItem
                key={index}
                active={index === firstActive}
                last={index === list.length - 1}
                data={item}
                muted={muted.includes(item.hour)}
                disabled={addedForTomorrow.includes(item.hour)}
              />
            ))
          ) : (
            <>
              <Icon type={GREAT} />
              <NothingText size={SMALL} weight={SEMI_BOLD}>
                To już wszystko na dziś!
              </NothingText>
            </>
          )}
        </>
      ) : (
        <NothingWrapper>
          <NothingText size={EXTRA_SMALL} weight={SEMI_BOLD}>
            {
              dataLoaded === 'not_verified'
                ? 'Zweryfikuj swój adres email...' // email not verified
                : 'Ups nic tutaj nie ma...' //empty list
            }
          </NothingText>
          {dataLoaded === 'not_verified' ? (
            <Icon type={REFRESH} onPress={() => dispatch(loadData())} />
          ) : (
            <>
              <Icon type={NOTHING} />
              <NothingText size={EXTRA_SMALL} weight={SEMI_BOLD}>
                Dodaj coś już teraz!
              </NothingText>
              {dataLoaded === 'error' ? (
                <Icon type={REFRESH} onPress={() => dispatch(loadData())} />
              ) : (
                <Icon type={ADD} onPress={() => history.push('/add')} active />
              )}
            </>
          )}
        </NothingWrapper>
      )}
    </TimeListComponent>
  ) : (
    <TimeListWrapper />
  );
};

export default TimeList;
