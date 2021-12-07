import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';

const AddView = ({match, history}) => {
  const [scan, setScan] = useState('');

  const openCamera = () => {
    history.push('/camera');
  };

  useEffect(() => {
    setScan(match.params.id);
  }, [match.params.id]);

  return <Button title={scan || 'Skanuj'} onPress={openCamera} />;
};

export default AddView;
