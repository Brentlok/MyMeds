import React from 'react';
import styled from 'styled-components/native';
import MetroText, {EXTRA_SMALL} from 'atoms/MetroText/MetroText';
import Icon, {PERSON, INFO, LOGOUT, ACCOUNTS, SETTINGS} from 'atoms/Icon/Icon';
import {useDispatch} from 'react-redux';
import {saveLocalData, emptyData} from 'src/actions/local_storage_actions';
import {useHistory} from 'react-router-native';
import {Alert} from 'react-native';
import {light_grey, grey} from 'src/colors';

const OptionListWrapper = styled.View``;

const Option = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const IconBox = styled.View`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  background-color: ${light_grey};
  border: 1px solid ${grey};
  border-radius: 5px;
`;

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
    // {
    //   name: 'Moje konto',
    //   icon: PERSON,
    //   active: true,
    //   action: () => history.push('/'),
    // },
    // {
    //   name: 'Konta pod nadzorem',
    //   icon: ACCOUNTS,
    //   active: true,
    //   action: () => history.push('/'),
    // },
    {
      name: 'Informacje o projekcie',
      icon: INFO,
      active: true,
      action: () => history.push('/info'),
    },
    {
      name: 'Ustawienia',
      icon: SETTINGS,
      active: true,
      action: () => history.push('/settings'),
    },
    {
      name: 'Wyloguj się',
      icon: LOGOUT,
      active: false,
      action: logout,
    },
  ];

  return (
    <OptionListWrapper>
      {optionList.map(({name, icon, active, action}) => (
        <Option key={name} onPress={action}>
          <IconBox>
            <Icon type={icon} active={active} />
          </IconBox>
          <MetroText size={EXTRA_SMALL}>{name}</MetroText>
        </Option>
      ))}
    </OptionListWrapper>
  );
};

export default AccountSection;
