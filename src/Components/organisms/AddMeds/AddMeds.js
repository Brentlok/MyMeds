import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import TitleInput from 'molecules/TitleInput/TitleInput';
import AmountInput from 'molecules/AmountInput/AmountInput';
import TimeInput from 'molecules/TimeInput/TimeInput';
import MetroText, {SMALL, REGULAR} from 'atoms/MetroText/MetroText';
import {createMed} from 'src/actions';

const AddMeds = () => {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const amountRef = useRef();
  const timeRef = useRef();

  const submit = () => {
    const name = nameRef.current.getValue();
    const amount = amountRef.current.getValue();
    const amountType = amountRef.current.getValueType();
    const time = timeRef.current.getValue();
    if (name === '') return;
    dispatch(createMed(name, amount, amountType, time));
  };

  const AddMedsWrapper = styled.View`
    width: 100%;
    height: ${Dimensions.get('window').height - 190}px;
    padding: 20px 30px 0 15px;
  `;

  const Title = styled(MetroText)`
    text-align: center;
    margin-bottom: 40px;
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

  return (
    <AddMedsWrapper>
      <Title size={REGULAR}>Dodaj lek / suplement</Title>
      <TitleInput passRef={nameRef} title="Nazwa leku / suplementu..." />
      <AmountInput getValue={amountRef} />
      <TimeInput getValue={timeRef} />
      <SubmitButton onPress={submit}>
        <MetroText size={SMALL}>Zatwierdź</MetroText>
      </SubmitButton>
    </AddMedsWrapper>
  );
};

export default AddMeds;
