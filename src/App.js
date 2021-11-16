import React, {useEffect} from 'react';

import {Alert, BackHandler} from 'react-native';
import {useBackHandler} from '@react-native-community/hooks';

import {NativeRouter, Switch, Route} from 'react-router-native';
import {Provider, useSelector, useDispatch} from 'react-redux';

import useNotification from 'src/Utils/useNotification';

import store from 'src/store';
import {changePath, loadData} from 'src/actions';

import RootView from 'src/Views/RootView';

import LostFocus from 'src/LostFocus';
import CalendarSection from 'organisms/CalendarSection/CalendarSection';
import TimeSection from 'organisms/TimeSection/TimeSection';
import TopPanel from 'molecules/TopPanel/TopPanel';
import BottomPanel from 'molecules/BottomPanel/BottomPanel';

const App = () => {
  const {inputFocused, path, oldPath} = useSelector(state => state);

  const dispatch = useDispatch();

  useNotification();

  // useEffect(() => {
  //   dispatch(loadData());
  // }, []);

  useBackHandler(() => {
    if (oldPath && path !== '/') {
      dispatch(changePath(oldPath));
      return true;
    }

    Alert.alert('Czy jesteś pewny że chcesz wyjść?', '', [
      {
        text: 'Anuluj',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Tak', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  });

  return (
    <RootView>
      {inputFocused && <LostFocus />}
      <TopPanel />
      <CalendarSection />
      <TimeSection />
      <BottomPanel />
    </RootView>
  );
};

const ProviderApp = () => (
  <NativeRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </NativeRouter>
);

export default ProviderApp;
