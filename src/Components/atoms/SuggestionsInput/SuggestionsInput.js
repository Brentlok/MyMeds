import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import MetroText, {INPUT, MEDIUM} from 'atoms/MetroText/MetroText';
import {useParams} from 'react-router-native';
import TogglePasswordIcon from 'assets/svg/password.svg';
import {black, primary, light_grey, grey} from 'src/colors';
import useDebounce from 'src/hooks/useDebounce';
import {suggestItem, getByCode} from 'src/actions/api_actions';

const SuggestionsInput = forwardRef(({number, password, autoComplete}, ref) => {
  const [borderColor, setBorderColor] = useState(grey);
  const [inputValue, setInputValue] = useState('');
  const [hidePassword, setHidePassword] = useState(!!password);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionBoxWidth, setSuggestionBoxWidth] = useState(0);
  const [suggestionUsed, setSuggestionUsed] = useState(false);

  const inputRef = useRef();

  const debouncedText = useDebounce(inputValue, 400);

  useEffect(() => {
    async function fetchSuggestions() {
      const list = await suggestItem(debouncedText);
      if (list.length) {
        setSuggestions(list);
        setShowSuggestions(true);
      }
    }
    if (debouncedText !== '') {
      if (suggestionUsed) {
        return;
      }
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  const {scan} = useParams();

  useEffect(() => {
    async function fetchMed() {
      const medicine = await getByCode(scan);
      setInputValue(medicine);
      setBorderColor(black);
      setSuggestionUsed(true);
    }
    if (scan) {
      fetchMed();
    }
  }, [scan]);

  useEffect(() => {
    if (borderColor === black) {
      setShowSuggestions(false);
    }
  }, [borderColor, showSuggestions]);

  useImperativeHandle(ref, () => ({
    getValue: () => inputValue,
    setValue: value => {
      setInputValue(value);
    },
    setBorderColor: value => {
      setBorderColor(value);
    },
  }));

  const handleChange = value => {
    setSuggestionUsed(false);
    if (number) {
      if (/[0-9]/.test(value[value.length - 1]) || value === '') {
        setInputValue(value);
      }
      return;
    }
    setInputValue(value);
  };

  //for some reasons input from styled-components wont work properly
  const styles = StyleSheet.create({
    input: {
      width: '100%',
      marginRight: 15,
      flexShrink: 1,
      height: 50,
      padding: 15,
      fontFamily: 'Metropolis-Medium',
      color: black,
      borderWidth: 2,
      borderColor: borderColor,
      borderRadius: showSuggestions && suggestions.length ? 0 : 9,
      borderTopLeftRadius: 9,
      borderTopRightRadius: 9,
      backgroundColor: light_grey,
    },
    togglePassword: {
      position: 'absolute',
      bottom: 15,
      right: 15,
    },
    suggestionsBox: {
      padding: 10,
      borderWidth: 2,
      borderColor: borderColor,
      position: 'absolute',
      borderBottomLeftRadius: 9,
      borderBottomRightRadius: 9,
      top: 48,
      left: 0,
      width: suggestionBoxWidth,
      backgroundColor: light_grey,
      zIndex: 1000,
    },
    suggestion: {
      marginBottom: 10,
      overflow: 'hidden',
    },
  });

  const handleSuggestion = value => {
    setInputValue(value);
    setSuggestions([]);
    inputRef.current.blur();
    setSuggestionUsed(true);
  };

  const Suggestions = suggestions.map(item => (
    <TouchableOpacity
      onPress={() => handleSuggestion(item)}
      key={item}
      style={styles.suggestion}>
      <MetroText size={INPUT} weight={MEDIUM}>
        {item}
      </MetroText>
    </TouchableOpacity>
  ));

  return (
    <>
      {showSuggestions && (
        <View style={styles.suggestionsBox}>{Suggestions}</View>
      )}
      <TextInput
        ref={inputRef}
        onLayout={e => setSuggestionBoxWidth(e.nativeEvent.layout.width)}
        style={styles.input}
        onChangeText={handleChange}
        value={inputValue}
        onFocus={() => {
          setBorderColor(primary);
          if (suggestions.length) {
            setShowSuggestions(true);
          }
        }}
        onBlur={() => {
          setBorderColor(inputValue ? black : grey);
          setShowSuggestions(false);
        }}
        autoComplete={autoComplete}
        keyboardType={number ? 'numeric' : 'default'}
        secureTextEntry={hidePassword}
      />
      {password && (
        <TouchableOpacity
          onPressIn={() => setHidePassword(false)}
          onPressOut={() => setHidePassword(true)}
          style={styles.togglePassword}>
          <TogglePasswordIcon />
        </TouchableOpacity>
      )}
    </>
  );
});

export default SuggestionsInput;
