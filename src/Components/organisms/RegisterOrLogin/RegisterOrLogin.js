import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import TitleInput from 'molecules/TitleInput/TitleInput';
import Button from 'atoms/Button/Button';
import MetroText, {BIG} from 'atoms/MetroText/MetroText';
import {login, register} from 'src/actions';

const ROLWrapper = styled.View`
  margin-top: 50px;
`;
const Title = styled(MetroText)`
  text-align: center;
  margin-bottom: 30px;
`;

const RegisterOrLogin = ({where}) => {
  const dispatch = useDispatch();
  const mailRef = useRef(null);
  const password1Ref = useRef(null);
  const password2Ref = useRef(null);
  const submit = () => {
    if (where === 'register') {
      const mail = mailRef.current.getValue();
      const password1 = password1Ref.current.getValue();
      const password2 = password2Ref.current.getValue();
      if (password1 !== password2) {
        return;
      }
      register(mail, password1, 'anonymous');
      return;
    }
    const mail = mailRef.current.getValue();
    const password1 = password1Ref.current.getValue();
    dispatch(login(mail, password1));
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
          <Button onPress={submit} primary value="Utwórz konto" />
        </>
      ) : (
        <>
          <TitleInput password title="Podaj hasło..." passRef={password1Ref} />
          <Button onPress={submit} primary value="Zaloguj się" />
        </>
      )}
    </ROLWrapper>
  );
};

export default RegisterOrLogin;
