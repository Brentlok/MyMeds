import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import TitleInput from 'molecules/TitleInput/TitleInput';
import Button from 'atoms/Button/Button';
import MetroText, {BIG, MEDIUM, SMALL} from 'atoms/MetroText/MetroText';
import {login, register} from 'src/actions';

const ROLWrapper = styled.View`
  margin-top: 30px;
`;
const Title = styled(MetroText)`
  text-align: center;
  margin-bottom: 30px;
`;
const Message = styled(MetroText)`
  margin-top: -10px;
  margin-bottom: 5px;
  text-align: center;
`;

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterOrLogin = ({where}) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const mailRef = useRef(null);
  const password1Ref = useRef(null);
  const password2Ref = useRef(null);

  const submit = async () => {
    if (where === 'register') {
      const mail = mailRef.current.getValue();
      const password1 = password1Ref.current.getValue();
      const password2 = password2Ref.current.getValue();
      if (!emailRegex.test(mail)) {
        setMessage('Podaj prawidłowy adres email');
        return;
      }
      if (password1 !== password2) {
        password1Ref.current.setBorderColor('#FF5252');
        password2Ref.current.setBorderColor('#FF5252');
        setMessage('Podane hasła nie są identyczne');
        return;
      }
      if (password1.length < 8) {
        password1Ref.current.setBorderColor('#FF5252');
        password2Ref.current.setBorderColor('#FF5252');
        setMessage('Proszę podaj dłuższe hasło');
        return;
      }
      const sendRegister = await dispatch(
        register(mail, password1, 'anonymous'),
      );
      if (sendRegister.message) {
        setMessage(JSON.stringify(sendRegister.message));
      } else {
        setMessage('Pomyślnie zarejestrowano!');
        mailRef.current.setValue('');
        password1Ref.current.setValue('');
        password2Ref.current.setValue('');
      }
      return;
    }
    const mail = mailRef.current.getValue();
    const password1 = password1Ref.current.getValue();
    const sendLogin = await dispatch(login(mail, password1));
    setMessage(JSON.stringify(sendLogin.message));
  };

  return (
    <ROLWrapper>
      <Title size={BIG}>
        {where === 'register' ? 'Utwórz konto...' : 'Zaloguj się...'}
      </Title>
      <TitleInput title="Podaj swój adres e-mail..." passRef={mailRef} />
      {where === 'register' ? (
        <>
          <TitleInput password title="Utwórz hasło..." passRef={password1Ref} />
          <TitleInput
            password
            title="Powtórz hasło..."
            passRef={password2Ref}
          />
          <Message size={SMALL} weight={MEDIUM}>
            {message}
          </Message>
          <Button onPress={submit} primary value="Utwórz konto" />
        </>
      ) : (
        <>
          <TitleInput password title="Podaj hasło..." passRef={password1Ref} />
          <Message size={SMALL} weight={MEDIUM}>
            {message}
          </Message>
          <Button onPress={submit} primary value="Zaloguj się" />
        </>
      )}
    </ROLWrapper>
  );
};

export default RegisterOrLogin;
