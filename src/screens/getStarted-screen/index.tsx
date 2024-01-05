import React, {useEffect, useLayoutEffect} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import {Images} from 'src/assets';
import {fullWidth, heightRef} from 'src/config/screenSize';
import {fontWeights} from 'src/config/fontWeight';
import Button, {Alignments} from 'src/components/button';
import {colors} from 'src/config/colors';
import {useNavigation} from '@react-navigation/native';
import Text from 'src/components/text';
import {useSelector} from 'react-redux';
import {getLanguage} from 'src/redux/auth/authSelector';

const GetStartedScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();

  // States

  // Selectors
  const language = useSelector(getLanguage);

  // Effects

  // Functions

  // Validators

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image
          style={styles.truckImage}
          resizeMode="contain"
          source={Images.introImg}
        />
        <Text language={language} style={styles.heading}>
          You’ll be back in{' '}
        </Text>
        <Text language={language} style={styles.heading2}>
          Business
        </Text>

        <Button
          onPress={() => {
            navigation.navigate('LoginPhoneScreen');
          }}
          buttonText={'Login'}
          buttonHeight={40 * heightRef}
          buttonWidth={0.85 * fullWidth}
          buttonColor={colors.primary}
          iconSize={25}
          buttonCorners={20 * heightRef}
          buttonPosition={Alignments.center}
          titleFontStyle={fontWeights.h500}
          buttonstyle={{
            marginBottom: 10 * heightRef,
            marginTop: 105 * heightRef,
          }}
        />
        <Button
          onPress={() => {
            navigation.navigate('AccountTypeScreen');
          }}
          buttonText={'Register'}
          buttonHeight={40 * heightRef}
          buttonWidth={0.85 * fullWidth}
          buttonColor={colors.primary}
          iconSize={25}
          buttonCorners={20 * heightRef}
          buttonPosition={Alignments.center}
          titleFontStyle={fontWeights.h500}
          buttonstyle={{
            marginBottom: 88 * heightRef,
            marginTop: 10 * heightRef,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default GetStartedScreen;
