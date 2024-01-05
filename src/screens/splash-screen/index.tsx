import React, {useEffect, useLayoutEffect} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {getLanguage, getUserId} from 'src/redux/auth/authSelector';
import {Images} from 'src/assets';
import io from 'socket.io-client';
import {Button} from 'react-native-paper';
import {fullWidth, heightRef} from 'src/config/screenSize';
import {colors} from 'src/config/colors';
import {Alignments} from 'src/components/button';
import {fontWeights} from 'src/config/fontWeight';
import Text from 'src/components/text';
import {ActivityIndicator} from 'react-native';

const SplashScreen = (props: any) => {
  // Variables
  // var sockett = io('https://8ac4-103-116-251-41.ngrok-free.app');

  // States

  // Selectors
  const language = useSelector(getLanguage);
  let id = useSelector(getUserId);

  // Effects
  useEffect(() => {
    console.log('UseEffect', id);
    socketCall();
  }, []);

  useLayoutEffect(() => {
    console.log('UseLayoutEffect');
  }, []);

  // Functions
  const socketCall = async () => {
    // console.log('--->', sockett);
    // sockett.on('driver-company-chat', (data: any) => {
    //   // Handle the received data
    //   console.log('message from backend', data);
    // });
    // sockett.emit('join-room', {
    //   sender: '643160b9e7eb9f1358ed24b1',
    //   receiver: '643d1d6703afe4521890e989',
    // });
  };

  // Validators

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image
          style={styles.truckImage}
          resizeMode="contain"
          source={Images.logoD}
        />
        <Text language={language} style={styles.heading}>
          TIRminator
        </Text>
      </View>
      <ActivityIndicator
        size={'large'}
        color={colors.primary}
        style={{marginBottom: 30 * heightRef}}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
