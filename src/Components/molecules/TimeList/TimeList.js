import React, {useEffect, useState} from 'react';
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

const TimeList = ({height}) => {
  const {list, dataLoaded, takenToday, muted, addedForTomorrow} = useSelector(
    state => state,
  );

  const filteredList = list.filter(
    ({hour}) => addedForTomorrow.includes(hour) || !takenToday.includes(hour),
  );

  const [firstActive, setFirstActive] = useState(null);

  const dispatch = useDispatch();

  const history = useHistory();

  const TimeListWrapper = styled.ScrollView`
    height: ${height - 45}px;
  `;

  const NothingWrapper = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${height - 45}px;
    padding: 10px 0;
  `;

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
      setFirstActive(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedForTomorrow, dataLoaded]);

  //wait for api
  return dataLoaded ? (
    <TimeListWrapper>
      {list.length ? (
        <>
          {firstActive === null ? (
            <NothingWrapper>
              <Icon type={GREAT} />
              <NothingText size={SMALL} weight={SEMI_BOLD}>
                To już wszystko na dziś!
              </NothingText>
            </NothingWrapper>
          ) : (
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
    </TimeListWrapper>
  ) : (
    <TimeListWrapper />
  );
};

export default TimeList;
