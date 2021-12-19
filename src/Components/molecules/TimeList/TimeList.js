import React, {useState} from 'react';
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

  const [listHeight, setListHeight] = useState(0);

  const dispatch = useDispatch();

  const history = useHistory();

  const TimeListWrapper = styled.ScrollView`
    width: ${Dimensions.get('window').width - 30}px;
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
    height: ${listHeight}px;
  `;

  const getHeight = ({nativeEvent: {layout}}) => {
    const {height} = layout;
    setListHeight(height);
  };

  //wait for api
  return dataLoaded ? (
    <TimeListWrapper onLayout={getHeight}>
      {list.length ? (
        <>
          {list.map((item, index) => (
            <TimeItem
              key={index}
              active={index === 0}
              last={index === list.length - 1}
              data={item}
            />
          ))}
        </>
      ) : (
        <NothingWrapper>
          <MetroText size={SMALL} weight={SEMI_BOLD}>
            {
              dataLoaded === 'error'
                ? 'Ups coś poszło nie tak...' //in case of api error
                : dataLoaded === 'not_verified'
                ? 'Zweryfikuj swój adres email...' // email not verified
                : 'Ups nic tutaj nie ma...' //empty list
            }
          </MetroText>
          {dataLoaded === 'not_verified' ? (
            <Icon type={REFRESH} onPress={() => dispatch(loadData())} />
          ) : (
            <>
              <Icon type={NOTHING} />
              <MetroText size={SMALL} weight={SEMI_BOLD}>
                {
                  dataLoaded === 'error'
                    ? 'Spróbuj ponownie później' //in case of api error
                    : 'Dodaj coś już teraz!' //empty list
                }
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
