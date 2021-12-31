import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import TimeItem from 'atoms/TimeItem/TimeItem';
import {useSelector, useDispatch} from 'react-redux';
import {loadData} from 'src/actions';
import Icon, {NOTHING, REFRESH, ADD} from 'atoms/Icon/Icon';
import MetroText, {EXTRA_SMALL, SEMI_BOLD} from 'atoms/MetroText/MetroText';
import {useHistory} from 'react-router-native';

const TimeList = ({height}) => {
  const {list, dataLoaded, takenToday, muted, addedForTomorrow} = useSelector(
    state => state,
  );

  const [firstActive, setFirstActive] = useState(null);

  const dispatch = useDispatch();

  const history = useHistory();

  const TimeListWrapper = styled.ScrollView`
    padding: 0 15px;
    height: ${height - 45}px;
  `;

  const NothingWrapper = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: ${height - 45}px;
    padding: 10px 0;
  `;

  useEffect(() => {
    if (!dataLoaded) {
      return;
    }
    const filteredList = list.filter(
      ({hour}) => addedForTomorrow.includes(hour) || !takenToday.includes(hour),
    );
    for (let i = 0; i < filteredList.length; i++) {
      //if there are some items added for tommorow before first active for today
      if (!addedForTomorrow.includes(filteredList[i].hour)) {
        setFirstActive(i);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedForTomorrow, dataLoaded]);

  //wait for api
  return dataLoaded ? (
    <TimeListWrapper>
      {list.length ? (
        <>
          {list
            .filter(
              ({hour}) =>
                addedForTomorrow.includes(hour) || !takenToday.includes(hour),
            )
            .map((item, index) => (
              <TimeItem
                key={index}
                active={index === firstActive}
                last={index === list.length - 1}
                data={item}
                muted={muted.includes(item.hour)}
                disabled={addedForTomorrow.includes(item.hour)}
              />
            ))}
        </>
      ) : (
        <NothingWrapper>
          <MetroText size={EXTRA_SMALL} weight={SEMI_BOLD}>
            {
              dataLoaded === 'not_verified'
                ? 'Zweryfikuj swój adres email...' // email not verified
                : 'Ups nic tutaj nie ma...' //empty list
            }
          </MetroText>
          {dataLoaded === 'not_verified' ? (
            <Icon type={REFRESH} onPress={() => dispatch(loadData())} />
          ) : (
            <>
              <Icon type={NOTHING} />
              <MetroText size={EXTRA_SMALL} weight={SEMI_BOLD}>
                Dodaj coś już teraz!
              </MetroText>
              {dataLoaded === 'error' ? (
                <Icon type={REFRESH} onPress={() => dispatch(loadData())} />
              ) : (
                <Icon type={ADD} onPress={() => history.push('/add')} active />
              )}
            </>
          )}
        </NothingWrapper>
      )}
    </TimeListWrapper>
  ) : (
    <TimeListWrapper />
  );
};

export default TimeList;
