import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  // Text,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';

import Text from 'src/components/text';
import {styles} from './styles';
import {Images} from 'src/assets';
import {fontRef, fullWidth, heightRef, widthRef} from 'src/config/screenSize';
import {fontWeights} from 'src/config/fontWeight';
import Button, {Alignments} from 'src/components/button';
import {colors} from 'src/config/colors';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import PhoneInput from 'react-native-phone-number-input';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getLanguage} from 'src/redux/auth/authSelector';
const LoginPhoneScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const phoneInput: any = useRef<PhoneInput>(null);

  // States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [borderColor, setBorderColor] = useState(colors.primary);
  const [loader, setLoader] = useState(false);

  // Selectors
  const language = useSelector(getLanguage);

  // Effects

  // Functions
  const onNumberChange = (phoneNumber: string) => {
    setBorderColor(colors.primary);
    setPhoneNumber(phoneNumber);
    setIsValidPhoneNumber(true);
  };
  const onNumberClear = () => {
    setPhoneNumber('');
  };
  const onNext = (phoneNumber: string) => {
    setLoader(true);

    const isValidPhoneNumber = phoneInput.current.isValidNumber(phoneNumber);
    isValidPhoneNumber
      ? (setLoader(false),
        navigation.navigate('LoginPasswordScreen', {
          number:
            phoneNumber.split('+92')[1]?.charAt(0) == '0'
              ? '+92' + phoneNumber.split('+920')[1]
              : phoneNumber,
        }))
      : (setLoader(false),
        setIsValidPhoneNumber(false),
        setBorderColor(colors.error));
  };

  // Validators

  // Screen Design
  return (
    <SafeAreaView
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();

        return false;
      }}
      style={styles.container}>
      <View style={styles.container}>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          isButtonText={false}
          buttonHeight={32 * heightRef}
          buttonWidth={32 * heightRef}
          isIcon
          buttonColor={colors.grey100}
          iconSize={18 * heightRef}
          buttonCorners={20 * heightRef}
          buttonPosition={Alignments.flex_start}
          buttonstyle={styles.backButton}
          iconName={'arrow-back-sharp'}
          iconType={'Ionicons'}
        />
        <Text language={language} style={styles.heading}>
          Login into your account
        </Text>

        <View>
          <Text
            language={language}
            style={[styles.text1, {color: borderColor}]}>
            Phone
          </Text>
          {!isValidPhoneNumber ? (
            <Pressable
              style={{
                position: 'absolute',
                right: 10 * widthRef,
                zIndex: 1,
                top: 15 * heightRef,
              }}>
              <Icon
                name={'alert-circle'}
                type={IconType.Ionicons}
                size={25 * heightRef}
                color={colors.error}
              />
            </Pressable>
          ) : null}
          <PhoneInput
            containerStyle={[
              styles.textInputContainer,
              {borderColor: borderColor, zIndex: -1},
            ]}
            textContainerStyle={{backgroundColor: 'transparent'}}
            textInputStyle={
              Platform.OS == 'android'
                ? styles.textInputTextAndroid
                : styles.textInputText
            }
            textInputProps={{
              placeholderTextColor: 'grey',
              cursorColor: colors.secondary1,
              selectionColor: colors.secondary1,
            }}
            codeTextStyle={{fontSize: 17 * fontRef, color: 'black'}}
            flagButtonStyle={styles.flagButton}
            ref={phoneInput}
            autoFocus
            value={phoneNumber}
            defaultValue={phoneNumber}
            defaultCode="PK"
            placeholder="Enter Number"
            onChangeFormattedText={onNumberChange}
          />
          {!isValidPhoneNumber ? (
            <Text
              style={{
                color: colors.error,
                marginLeft: '4%',
              }}>
              {phoneNumber == ''
                ? ' Enter your phone number'
                : ' Phone number is invalid'}
            </Text>
          ) : null}
        </View>
        <View style={styles.bottomView}>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text language={language} style={styles.text2a}>
              Forgot password?
            </Text>
            <Text> </Text>
            <Text
              onPress={() => {
                navigation.navigate('ForgetPasswordScreen');
              }}
              style={styles.text3}>
              Click here
            </Text>
          </View>
          <Button
            onPress={() => {
              onNext(phoneNumber);
            }}
            buttonText={'Next'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={colors.primary}
            iconSize={25}
            isLoading={loader}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPhoneScreen;
