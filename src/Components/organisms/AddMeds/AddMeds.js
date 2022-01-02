import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import {Dimensions, Animated} from 'react-native';
import AmountInput from 'molecules/AmountInput/AmountInput';
import TimeInput from 'molecules/TimeInput/TimeInput';
import TitleInput from 'molecules/TitleInput/TitleInput';
import MetroText, {SMALL, REGULAR, MEDIUM} from 'atoms/MetroText/MetroText';
import {createMed} from 'src/actions/api_actions';
import SuccessScreen from 'atoms/SuccessScreen/SuccessScreen';

const AddMedsWrapper = styled.View`
  width: 100%;
  height: ${Dimensions.get('window').height - 190}px;
  padding: 20px 30px 0 15px;
`;

const Title = styled(MetroText)`
  text-align: center;
  margin-bottom: 40px;
`;

const Message = styled(MetroText)`
  margin-top: 20px;
  text-align: center;
`;

const SubmitButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 25px;
  left: ${(Dimensions.get('window').width - 185) / 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 185px;
  height: 60px;
  margin: auto;
  border: 3px solid #11d8a5;
  elevation: 3;
  background-color: #fff;
  border-radius: 100px;
`;

const AddMeds = () => {
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const successAnim = useRef(new Animated.Value(0)).current;

  successAnim.addListener(({value}) => {
    if (value === 1) {
      setTimeout(() => {
        setShowSuccess(false);
      }, 700);
    }
  });

  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const amountRef = useRef(null);
  const timeRef = useRef(null);

  const submit = async () => {
    const name = nameRef.current.getValue();
    const amount = amountRef.current.getValue();
    const amountType = amountRef.current.getValueType();
    const time = timeRef.current.getValue();
    if (name === '') {
      setMessage('Musisz coś wpisać...');
      nameRef.current.setBorderColor('#FF5252');
      return;
    }
    const sendCreateMed = await dispatch(
      createMed(name, amount, amountType, time),
    );
    if (sendCreateMed) {
      if (sendCreateMed === 'success') {
        setShowSuccess(true);
        setMessage('');
        nameRef.current.setValue('');
        return;
      } else {
        setMessage(sendCreateMed);
        console.log(sendCreateMed);
      }
    }
  };

  return (
    <>
      <SuccessScreen fadeAnim={successAnim} show={showSuccess} />
      <AddMedsWrapper>
        <Title size={REGULAR}>Dodaj lek / suplement</Title>
        <TitleInput
          passRef={nameRef}
          title="Nazwa leku / suplementu..."
          autoComplete="off"
        />
        <AmountInput getValue={amountRef} />
        <TimeInput getValue={timeRef} />
        <Message size={SMALL} weight={MEDIUM}>
          {message}
        </Message>
        <SubmitButton onPress={() => (showSuccess ? null : submit())}>
          <MetroText size={SMALL}>Zatwierdź</MetroText>
        </SubmitButton>
      </AddMedsWrapper>
    </>
  );
};

export default AddMeds;
