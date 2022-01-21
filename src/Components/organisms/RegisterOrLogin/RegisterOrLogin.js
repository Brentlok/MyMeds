import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import {Dimensions} from 'react-native';
import TitleInput from 'molecules/TitleInput/TitleInput';
import Button from 'atoms/Button/Button';
import MetroText, {BIG, MEDIUM, SMALL} from 'atoms/MetroText/MetroText';
import {login, register} from 'src/actions/api_actions';
import Icon from 'assets/svg/group.svg';
import {red} from 'src/colors';
import {useHistory} from 'react-router-native';
import {saveRegisterData} from '../../../actions';

const GroupIcon = styled(Icon)`
  position: absolute;
  bottom: 0;
`;

const ROLWrapper = styled.View`
  position: absolute;
  top: 130px;
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height - 130}px;
  padding: 0 15px ${0.52 * Dimensions.get('window').width}px 15px;
`;

const Title = styled(MetroText)`
  text-align: center;
  margin-bottom: 20px;
`;

const Message = styled(MetroText)`
  margin-top: -10px;
  margin-bottom: 5px;
  text-align: center;
`;

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterOrLogin = ({where}) => {
  const history = useHistory();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const mailRef = useRef(null);
  const password1Ref = useRef(null);
  const password2Ref = useRef(null);

  const registerSubmit = async () => {
    const mail = mailRef.current.getValue();
    const password1 = password1Ref.current.getValue();
    const password2 = password2Ref.current.getValue();
    if (!emailRegex.test(mail)) {
      setMessage('Podaj prawidłowy adres email');
      mailRef.current.setBorderColor(red);
      return;
    }
    if (password1 !== password2) {
      password1Ref.current.setBorderColor(red);
      password2Ref.current.setBorderColor(red);
      setMessage('Podane hasła nie są identyczne');
      return;
    }
    if (password1.length < 8) {
      password1Ref.current.setBorderColor(red);
      password2Ref.current.setBorderColor(red);
      setMessage('Proszę podaj dłuższe hasło');
      return;
    }
    const registerData = {mail, password: password1};
    dispatch(saveRegisterData(registerData));
    history.push('/start/name');
  };

  const nameSubmit = async () => {
    const name = mailRef.current.getValue();
    const sendRegister = await dispatch(register(name));
    if (sendRegister.message) {
      setMessage(JSON.stringify(sendRegister.message));
    } else {
      setMessage('Pomyślnie zarejestrowano!');
    }
  };

  const loginSubmit = async () => {
    const mail = mailRef.current.getValue();
    const password1 = password1Ref.current.getValue();
    if (!emailRegex.test(mail)) {
      setMessage('Podaj prawidłowy adres email');
      mailRef.current.setBorderColor(red);
      return;
    }
    if (!password1) {
      setMessage('Wpisz hasło');
      password1Ref.current.setBorderColor(red);
      return;
    }
    const sendLogin = await dispatch(login(mail, password1));
    if (sendLogin) {
      setMessage(sendLogin);
    }
  };

  const submit = async () => {
    if (where === 'register') {
      await registerSubmit();
      return;
    }
    if (where === 'name') {
      await nameSubmit();
      return;
    }
    await loginSubmit();
  };

  return (
    <ROLWrapper>
      <Title size={BIG}>
        {where === 'register'
          ? 'Utwórz konto...'
          : where === 'name'
          ? 'To już ostatni etap...'
          : 'Zaloguj się...'}
      </Title>
      <TitleInput
        autoComplete={where === 'name' ? 'off' : 'email'}
        title={
          where === 'name'
            ? 'Podaj swoją nazwę użytkownika...'
            : 'Podaj swój adres e-mail...'
        }
        passRef={mailRef}
      />
      {where === 'register' ? (
        <>
          <TitleInput
            password
            autoComplete="password"
            title="Utwórz hasło..."
            passRef={password1Ref}
          />
          <TitleInput
            autoComplete="password"
            password
            title="Powtórz hasło..."
            passRef={password2Ref}
          />
          <Message size={SMALL} weight={MEDIUM}>
            {message}
          </Message>
          <Button onPress={submit} primary value="Przejdź dalej..." />
        </>
      ) : where === 'name' ? (
        <>
          <Message size={SMALL} weight={MEDIUM}>
            {message}
          </Message>
          <Button onPress={submit} primary value="Utwórz konto" />
        </>
      ) : (
        <>
          <TitleInput
            autoComplete="password"
            password
            title="Podaj hasło..."
            passRef={password1Ref}
          />
          <Message size={SMALL} weight={MEDIUM}>
            {message}
          </Message>
          <Button onPress={submit} primary value="Zaloguj się" />
          <GroupIcon
            width={Dimensions.get('window').width}
            height={0.52 * Dimensions.get('window').width}
          />
        </>
      )}
    </ROLWrapper>
  );
};

export default RegisterOrLogin;
