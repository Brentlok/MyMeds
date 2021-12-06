import React from 'react';
import styled from 'styled-components/native';
import TimeItem from 'atoms/TimeItem/TimeItem';
import {Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {loadData} from 'src/actions';
import Icon, {NOTHING, REFRESH, ADD} from 'atoms/Icon/Icon';
import MetroText, {SMALL, SEMI_BOLD} from 'atoms/MetroText/MetroText';
import {useHistory} from 'react-router-native';

const TimeList = () => {
  const {list, dataLoaded} = useSelector(state => state);

  const dispatch = useDispatch();

  const history = useHistory();

  const TimeListWrapper = styled.ScrollView`
    width: ${Dimensions.get('window').width - 30}px;
    height: 100%;
    margin: 0 auto 70px auto;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background-color: #f5f5f5;
  `;

  const NothingWrapper = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0;
  `;

  const NothingText = styled(MetroText)`
    text-align: left;
    margin: 10px 0;
  `;

  //wait for api
  return dataLoaded ? (
    <TimeListWrapper>
      {list.length > 0 ? (
        list.map((data, index) => (
          <TimeItem
            key={index}
            active={index === 0}
            last={index === list.length - 1}
            data={data}
          />
        ))
      ) : (
        <NothingWrapper>
          <NothingText size={SMALL} weight={SEMI_BOLD}>
            {
              dataLoaded === 'error'
                ? 'Ups coś poszło nie tak...' //in case of api error
                : 'Ups nic tutaj nie ma...' //empty list
            }
          </NothingText>
          <Icon type={NOTHING} />
          <NothingText size={SMALL} weight={SEMI_BOLD}>
            {
              dataLoaded === 'error'
                ? 'Spróbuj ponownie później' //in case of api error
                : 'Dodaj coś już teraz!' //empty list
            }
          </NothingText>
          {dataLoaded === 'error' ? (
            <Icon type={REFRESH} onPress={() => dispatch(loadData())} />
          ) : (
            <Icon type={ADD} onPress={() => history.push('/add')} active />
          )}
        </NothingWrapper>
      )}
    </TimeListWrapper>
  ) : (
    <TimeListWrapper />
  );
};

export default TimeList;
