import React, {useEffect, useLayoutEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {getLanguage, getUserId} from 'src/redux/auth/authSelector';

const LoginScreen = (props: any) => {
  // Variables

  // States

  // Selectors
  const language = useSelector(getLanguage);
  let id = useSelector(getUserId);

  // Effects
  useEffect(() => {
    console.log('UseEffect', id);
  }, []);

  useLayoutEffect(() => {
    console.log('UseLayoutEffect');
  }, []);

  // Functions

  // Validators

  // Screen Design
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

export default LoginScreen;
