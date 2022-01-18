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
import {Provider, useDispatch, useSelector} from 'react-redux';

import store from 'src/store';
import {loadData} from 'src/actions/api_actions';
import {loadLocalData} from 'src/actions/local_storage_actions';

import RootView from 'src/Views/RootView';
import LoginView from 'src/Views/LoginView';
import HomeView from 'src/Views/HomeView';
import CalendarView from 'src/Views/CalendarView';
import AddView from 'src/Views/AddView';
import InfoView from 'src/Views/InfoView';
import AccountView from 'src/Views/AccountView';
import CameraView from 'src/Views/CameraView';
import SettingsView from 'src/Views/SettingsView';

import useNotification from 'src/hooks/useNotification';
import useReduxHistory from 'src/hooks/useReduxHistory';

// import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const {accessToken, localDataLoaded} = useSelector(state => state);
  const dispatch = useDispatch();

  const history = useHistory();
  const {pathname} = useLocation();

  // AsyncStorage.clear();
  useNotification();
  useReduxHistory();

  useEffect(() => {
    if (!localDataLoaded) {
      dispatch(loadLocalData());
      return;
    }
    if (accessToken) {
      dispatch(loadData());
      history.push('/home');
    } else {
      history.push('/start/start');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localDataLoaded]);

  useBackHandler(() => {
    if (pathname === '/camera') {
      history.push('/add');
      return true;
    }
    if (pathname.match(/\b(?:add|calendar|info)\b/) !== null) {
      history.push('/home');
      return true;
    }
    if (pathname.match(/\b(?:login|register)\b/) !== null) {
      history.push('/start/start');
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
        <Route exact path="/start/:where" component={LoginView} />
        <Route exact path="/home" component={HomeView} />
        <Route exact path="/calendar" component={CalendarView} />
        <Route exact path="/add" component={AddView} />
        <Route exact path="/add/:scan" component={AddView} />
        <Route exact path="/info" component={InfoView} />
        <Route exact path="/settings" component={SettingsView} />
        <Route exact path="/account" component={AccountView} />
        <Route exact path="/camera" component={CameraView} />
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
