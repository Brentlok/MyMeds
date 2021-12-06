import React, {useEffect} from 'react';

import {Alert, BackHandler} from 'react-native';
import {useBackHandler} from '@react-native-community/hooks';

import {
  NativeRouter,
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-native';
import {Provider, useDispatch} from 'react-redux';

import useBattery from 'src/Utils/useBattery';
import useNotification from 'src/Utils/useNotification';

import store from 'src/store';
import {loadData} from 'src/actions';

import RootView from 'src/Views/RootView';
import HomeView from 'src/Views/HomeView';
import CalendarView from 'src/Views/CalendarView';
import ModifyView from 'src/Views/ModifyView';

const App = () => {
  const dispatch = useDispatch();

  useBattery();
  useNotification();

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  const history = useHistory();
  const {pathname} = useLocation();

  useBackHandler(() => {
    if (pathname !== '/') {
      history.push('/');
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
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/calendar" component={CalendarView} />
        <Route exact path="/add" component={ModifyView} />
      </Switch>
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
