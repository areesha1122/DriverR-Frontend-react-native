import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  Pressable,
  SafeAreaView,
  Text as Text1,
  View,
} from 'react-native';
import {styles} from './styles';
import {Images} from 'src/assets';
import {fontRef, fullWidth, heightRef, widthRef} from 'src/config/screenSize';
import {fontWeights} from 'src/config/fontWeight';
import Button, {Alignments} from 'src/components/button';
import {colors} from 'src/config/colors';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import PhoneInput from 'react-native-phone-number-input';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {registerDriver, resendDriverOtp} from 'src/redux/auth/authApiCalls';
import AwesomeAlert from 'react-native-awesome-alerts';
import Text from 'src/components/text';
import {getLanguage} from 'src/redux/auth/authSelector';

const RegisterScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const phoneInput: any = useRef<PhoneInput>(null);
  const dispatch: any = useDispatch();

  // States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [borderColor, setBorderColor] = useState(colors.primary);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
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
  const onNext = (phoneNumber: string) => {
    setLoader(true);
    const isValidPhoneNumber = phoneInput.current.isValidNumber(phoneNumber);
    if (phoneNumber?.split('+92')[1]?.charAt(0) == '0' && isValidPhoneNumber) {
      console.log('---->>>', phoneNumber.split('+920')[1]);
      setPhoneNumber('+92' + phoneNumber.split('+920')[1]);
      const isValidPhoneNumber = phoneInput.current.isValidNumber(phoneNumber);
      isValidPhoneNumber
        ? register('+92' + phoneNumber.split('+920')[1])
        : (setLoader(false),
          setIsValidPhoneNumber(false),
          setBorderColor(colors.error));
    } else {
      const isValidPhoneNumber = phoneInput.current.isValidNumber(phoneNumber);
      isValidPhoneNumber
        ? register(phoneNumber)
        : (setLoader(false),
          setIsValidPhoneNumber(false),
          setBorderColor(colors.error));
    }
  };

  const register = (phone: any) => {
    dispatch(
      registerDriver(
        {
          phoneNumber: phone,
        },
        (success, msg) => {
          if (success) {
            console.log('41: Success');
            setLoader(false);
            3;
            navigation.navigate('RegisterOtpScreen', {number: phone});
          } else {
            console.log('43: Fail', msg);
            if (msg == 'User already exist with this phone') {
              dispatch(
                resendDriverOtp(
                  {
                    phoneNumber: phone,
                  },
                  (success, msg) => {
                    if (success) {
                      setLoader(false), console.log('41: Success');
                      navigation.navigate('RegisterOtpScreen', {
                        number: phone,
                      });
                    } else {
                      setError(msg);
                      setLoader(false);
                      setShowError(true);
                    }
                    return true;
                  },
                ),
              );
            } else {
              console.log('------', msg);
              setError(msg);
              setLoader(false);
              setShowError(true);
            }
          }
          return true;
        },
      ),
    );
  };

  // Validators

  // Screen Design
  return (
    <SafeAreaView
      style={styles.container}
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();

        return false;
      }}>
      <View style={styles.container}>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          isButtonText={false}
          buttonHeight={40 * heightRef}
          buttonWidth={40 * heightRef}
          isIcon
          buttonColor={colors.grey100}
          iconSize={22 * heightRef}
          buttonCorners={20 * heightRef}
          buttonPosition={Alignments.flex_start}
          buttonstyle={styles.backButton}
          iconName={'arrow-back-sharp'}
          iconType={'Ionicons'}
        />
        <Text language={language} style={styles.heading}>
          Enter your phone number{' '}
        </Text>
        <Text language={language} style={styles.text2}>
          We’ll send you a code. It helps us keep your account secure.
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
                top: -10,
              }}>
              {phoneNumber == ''
                ? ' Enter your phone number'
                : ' Phone number is invalid'}
            </Text>
          ) : null}
        </View>
        <View style={styles.bottomView}>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text language={language} style={styles.termText}>
              By signing up you agree to our
            </Text>
            <Text> </Text>
            <Text language={language} style={styles.termText2}>
              Term of Use
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10 * heightRef,
              alignSelf: 'center',
              marginTop: 2 * heightRef,
            }}>
            <Text language={language} style={styles.termText}>
              and
            </Text>
            <Text> </Text>
            <Text language={language} style={styles.termText2}>
              Privacy Policy.
            </Text>
          </View>
          <Button
            onPress={() => onNext(phoneNumber)}
            buttonText={'Send OTP'}
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
      <AwesomeAlert
        show={showError}
        showProgress={false}
        title=""
        titleStyle={{color: colors.error}}
        message={error}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText={error == 'Something went wrong' ? 'Ok' : 'Login'}
        cancelButtonColor={colors.primary}
        cancelButtonStyle={{width: 60, alignItems: 'center'}}
        onCancelPressed={() => {
          setShowError(false);

          error == 'Something went wrong'
            ? null
            : navigation.navigate('LoginPhoneScreen');
        }}
        onDismiss={() => {
          setShowError(false);
        }}
      />
    </SafeAreaView>
  );
};

export default RegisterScreen;
