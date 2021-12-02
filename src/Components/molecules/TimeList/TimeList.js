import React from 'react';
import styled from 'styled-components/native';
import TimeItem from 'atoms/TimeItem/TimeItem';
import {Dimensions, ScrollView, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {loadData} from 'src/actions';
import Icon, {NOTHING} from 'atoms/Icon/Icon';
import MetroText, {
  EXTRA_SMALL,
  SEMI_BOLD,
  DARK_GREY,
} from 'atoms/MetroText/MetroText';

const TimeList = () => {
  const {list, dataLoaded} = useSelector(state => state);

  const dispatch = useDispatch();

  const ScrollOrPress = dataLoaded === 'loaded' ? ScrollView : Pressable;

  const TimeListWrapper = styled(ScrollOrPress)`
    width: ${Dimensions.get('window').width - 30}px;
    height: 100%;
    margin: 0 auto 70px auto;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background-color: #f5f5f5;
  `;

  const NothingWrapper = styled.View`
    display: flex;
    flex-direction: row;
    padding: 50px 15px;
    align-items: center;
    justify-content: space-around;
  `;

  const NothingText = styled(MetroText)`
    text-align: left;
  `;

  //wait for api
  return dataLoaded ? (
    <TimeListWrapper onPress={() => dispatch(loadData())}>
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
          <Icon type={NOTHING} />
          <NothingText size={EXTRA_SMALL} weight={SEMI_BOLD} color={DARK_GREY}>
            {
              dataLoaded === 'error'
                ? 'Coś poszło nie tak,\nspróbuj ponownie później' //in case of api error
                : 'Ups nic tu nie ma,\nnajpierw coś dodaj' //empty list
            }
          </NothingText>
        </NothingWrapper>
      )}
    </TimeListWrapper>
  ) : (
    <TimeListWrapper />
  );
};

export default TimeList;
