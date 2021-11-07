import React from 'react';

import {Alert, BackHandler} from 'react-native';
import {useBackHandler} from '@react-native-community/hooks';

import {NativeRouter, Switch, Route} from 'react-router-native';
import {Provider, useSelector, useDispatch} from 'react-redux';

import store from 'src/store';
import {changePath} from 'src/actions';

import LostFocus from 'src/LostFocus';
import Calendar from 'molecules/Calendar/Calendar';

import {Text} from 'react-native';

const App = () => {
  const {inputFocused, path, oldPath} = useSelector(state => state);

  const dispatch = useDispatch();

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
    <>
      {inputFocused && <LostFocus />}
      <Calendar />
    </>
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
