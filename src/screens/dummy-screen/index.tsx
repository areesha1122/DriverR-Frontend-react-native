import React, {useEffect, useLayoutEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import {Button} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {getLanguage, getUserId} from 'src/redux/auth/authSelector';

const DummyScreen = (props: any) => {
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
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => {
          console.log('Press');
        }}
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
          colors: ['#FF9800', '#F44336'],
          start: {x: 1, y: 1},
          end: {x: 0, y: 0},
        }}>
        Linear Gradient
      </Button>

      <View style={styles.container}></View>
    </SafeAreaView>
  );
};

export default DummyScreen;
