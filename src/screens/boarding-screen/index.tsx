import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Header from 'src/components/head';
import {
  fullHeight,
  fullWidth,
  heightRef,
  widthRef,
} from 'src/config/screenSize';
import {colors} from 'src/config/colors';
import {Images} from 'src/assets';
import Button, {Alignments} from 'src/components/button';
import {fontWeights} from 'src/config/fontWeight';

const BoardingScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  // States
  const [onBoarding, setOnBoarding] = useState(1);
  const [title, setTitle] = useState('Title 1');
  const [paragraphContent, setParagraphContent] = useState('Paragraph 1');

  // Selectors

  // Effects
  useEffect(() => {
    setTitle(
      onBoarding === 3
        ? 'Explore application'
        : onBoarding === 2
        ? 'Experienced drivers'
        : 'Job opportunities',
    );
    setParagraphContent(
      onBoarding === 3
        ? 'Get your subscription plan & explore our features.'
        : onBoarding === 2
        ? 'Now you can hire experienced drivers easily through our platform.'
        : 'You can get best driving opportunities on your preffered routes.',
    );
  });

  // Functions
  const onSwipe = (gestureName: any) => {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        if (onBoarding < 3) {
          setOnBoarding(onBoarding + 1);
        }
        break;
      case SWIPE_RIGHT:
        if (onBoarding > 1) {
          setOnBoarding(onBoarding - 1);
        }
        break;
    }
  };

  // Validators

  // API Calls

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.skipView}>
        <Text
          onPress={() => {
            navigation.navigate('GetStartedScreen');
          }}
          style={[
            styles.skipText,
            {color: onBoarding === 3 ? 'transparent' : colors.background},
          ]}>
          Skip
        </Text>
      </View>
      <GestureRecognizer
        onSwipe={direction => onSwipe(direction)}
        config={config}
        style={{
          height: fullHeight * 0.8,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <Image
          source={
            onBoarding === 3
              ? Images.onBoardingImg3
              : onBoarding === 2
              ? Images.onBoardingImg2
              : Images.onBoardingImg1
          }
          resizeMode="contain"
          style={styles.onBoardingImage}
        />

        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.paragraphText}>{paragraphContent}</Text>
          <View style={styles.swiperView}>
            <View
              style={[
                styles.swiperIcon,
                {
                  backgroundColor: onBoarding === 1 ? '#78B3F5' : '#C7C7CC',
                },
              ]}
            />

            <View
              style={[
                styles.swiperIcon,
                {
                  backgroundColor: onBoarding === 2 ? '#78B3F5' : '#C7C7CC',
                },
              ]}
            />

            <View
              style={[
                styles.swiperIcon,
                {
                  backgroundColor: onBoarding === 3 ? '#78B3F5' : '#C7C7CC',
                },
              ]}
            />
          </View>
        </View>
      </GestureRecognizer>
      {onBoarding === 3 ? (
        <View
          style={{
            width: '90%',
            borderRadius: 6 * heightRef,
            position: 'absolute',
            bottom: 30 * heightRef,
          }}>
          <Button
            onPress={() => {
              navigation.navigate('GetStartedScreen');
            }}
            buttonText={'Get started'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={colors.background}
            iconSize={25}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            titleColor={colors.primary}
            buttonstyle={{}}
          />
        </View>
      ) : (
        <View
          style={{
            width: '90%',
            borderRadius: 6 * heightRef,
            position: 'absolute',
            bottom: 30 * heightRef,
          }}></View>
      )}
    </SafeAreaView>
  );
};

export default BoardingScreen;
