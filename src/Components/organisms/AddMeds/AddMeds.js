import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import NameInput from 'molecules/NameInput/NameInput';
import AmountInput from 'molecules/AmountInput/AmountInput';
import TimeInput from 'molecules/TimeInput/TimeInput';
import MetroText, {SMALL, REGULAR} from 'atoms/MetroText/MetroText';

const AddMeds = () => {
  const name = useRef();
  const amount = useRef();
  const time = useRef();

  const submit = () => {
    alert(
      name.current.getValue() +
        '\n' +
        amount.current.getValue() +
        ' ' +
        amount.current.getValueType() +
        '\n' +
        time.current.getValue(),
    );
    amount.current.closeList();
    time.current.closeList();
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
      <NameInput getValue={name} />
      <AmountInput getValue={amount} />
      <TimeInput getValue={time} />
      <SubmitButton onPress={submit}>
        <MetroText size={SMALL}>Zatwierdź</MetroText>
      </SubmitButton>
    </AddMedsWrapper>
  );
};

export default AddMeds;
