import React from 'react';
import styled from 'styled-components/native';
import MetroText, {SMALL} from 'atoms/MetroText/MetroText';
import {useDispatch} from 'react-redux';
import {saveLocalData} from 'src/actions/local_storage_actions';
import {useHistory} from 'react-router-native';

const OptionListWrapper = styled.View`
  padding-top: 15px;
  margin-left: 15px;
`;

const Option = styled.TouchableOpacity`
  margin-bottom: 15px;
`;

const OptionText = styled(MetroText)`
  text-decoration: underline;
`;

const OptionList = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(saveLocalData({accessToken: null}));
    history.push('/start/start');
  };
  return (
    <OptionListWrapper>
      <Option>
        <OptionText size={SMALL} onPress={logout}>
          Wyloguj się
        </OptionText>
      </Option>
      <Option>
        <OptionText size={SMALL}>Konta pod nadzorem</OptionText>
      </Option>
      <Option>
        <OptionText size={SMALL}>Napisz do...</OptionText>
      </Option>
    </OptionListWrapper>
  );
};

export default OptionList;
