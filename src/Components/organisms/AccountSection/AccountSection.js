import React from 'react';

import {useDispatch} from 'react-redux';
import {saveLocalData, emptyData} from 'src/actions/local_storage_actions';
import {useHistory} from 'react-router-native';
import {Alert} from 'react-native';

import {INFO, LOGOUT, SETTINGS} from 'atoms/Icon/Icon';
import Option from '../../atoms/Option/Option';

const AccountSection = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    Alert.alert('Czy chcesz się wylogować?', '', [
      {
        text: 'Anuluj',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Wyloguj',
        onPress: () => {
          dispatch(saveLocalData(emptyData));
          history.push('/start/start');
        },
      },
    ]);
  };

  const optionList = [
    {
      name: 'Informacje o projekcie',
      icon: INFO,
      active: true,
      action: () => history.push('/account/info'),
    },
    {
      name: 'Ustawienia',
      icon: SETTINGS,
      active: true,
      action: () => history.push('/account/settings'),
    },
    {
      name: 'Wyloguj się',
      icon: LOGOUT,
      active: false,
      action: logout,
    },
  ];

  return (
    <>
      {optionList.map(props => (
        <Option {...props} key={props.name} />
      ))}
    </>
  );
};

export default AccountSection;
