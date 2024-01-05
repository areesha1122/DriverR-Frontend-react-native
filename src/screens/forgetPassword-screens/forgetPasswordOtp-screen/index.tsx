import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Text as Text1,
  Image,
  Platform,
  SafeAreaView,
  TextInput,
  View,
  Keyboard,
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
import InputFeild from 'src/components/inputFeild';
import {useNavigation, useRoute} from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import {useDispatch, useSelector} from 'react-redux';
import {
  resendDriverOtp,
  verifyForgetOtpDriver,
} from 'src/redux/auth/authApiCalls';
import AwesomeAlert from 'react-native-awesome-alerts';
import {getLanguage} from 'src/redux/auth/authSelector';
const ForgetPasswordOtpScreen = (props: any) => {
  // Variables
  const phoneInput: any = useRef<PhoneInput>(null);
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch: any = useDispatch();
  const RESEND_TIME_LIMIT = 60;
  const [remainingTime, setRemainingTime] = useState(RESEND_TIME_LIMIT);
  let intervalRef: any = useRef<NodeJS.Timer>();

  // States
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [code, setCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [loader, setLoader] = useState(false);

  // Selectors
  const language = useSelector(getLanguage);

  // Effects
  useEffect(() => {
    triggerResendInterval();
    return () => clearInterval(intervalRef.current);
  });

  // Functions
  const triggerResendInterval = () => {
    let intervalId = setInterval(() => {
      setRemainingTime(remainingTime => remainingTime - 1);
      if (remainingTime <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setShowResend(true);
      }
    }, 1000);
    intervalRef.current = intervalId;
  };
  const resend = () => {
    setShowResend(false);
    setRemainingTime(RESEND_TIME_LIMIT);
    dispatch(
      resendDriverOtp(
        {
          phoneNumber: route.params.number,
        },
        (success, msg) => {
          if (success) {
            console.log('41: Success');
            setShowSuccess(true);
          } else {
            setError(msg);
            setShowError(true);
          }
          return true;
        },
      ),
    );
  };

  const verifyOtp = () => {
    setLoader(true);
    dispatch(
      verifyForgetOtpDriver(
        {
          phoneNumber: route.params.number,
          otp: code,
        },
        (success, msg) => {
          if (success) {
            console.log('41: Success');
            setLoader(false);
            navigation.navigate('ChangePasswordScreen', {
              number: route.params.number,
            });
            // setShowSuccess(true);
          } else {
            setLoader(false);
            setError(msg);
            setShowError(true);
          }
          return true;
        },
      ),
    );
  };

  // Validators
  const checkOtp = () => {
    code.length < 6
      ? (setError('Please enter your complete OTP'), setShowError(true))
      : verifyOtp();
  };
  const renderInputComponent = (inputProps: any, index: any) => {
    const inputIsFilled = index < code.length;
    const borderColor = inputIsFilled ? 'green' : 'gray';

    return (
      <View style={{borderColor}}>
        <TextInput {...inputProps} />
      </View>
    );
  };

  // Screen Design
  return (
    <SafeAreaView
      style={styles.container}
      onTouchStart={() => Keyboard.dismiss()}>
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
          Enter recovery code
        </Text>
        <Text language={language} style={styles.text4}>
          Enter the 6-digit recovery code sent to
        </Text>
        <Text1 style={styles.text4}>{route.params.number}</Text1>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            marginLeft: '3%',
            marginTop: 50 * heightRef,
          }}>
          <OtpInputs
            autoFocus={true}
            inputContainerStyles={{
              marginHorizontal: 7 * widthRef,
              width: 45 * heightRef,
              height: 45 * heightRef,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderWidth: 1 * widthRef,
              backgroundColor: '#F9FAFB',
              borderColor: code.length == 6 ? colors.primary : '#E5E7EB',
              paddingLeft: Platform.OS == 'android' ? 5 * widthRef : 0,
              borderRadius: 9 * heightRef,
            }}
            autofillFromClipboard
            inputStyles={{
              color: colors.primary,
              alignSelf: 'center',
              fontSize: 19 * fontRef,
              top: Platform.OS == 'android' ? 2.5 * heightRef : 0,
              left: Platform.OS == 'android' ? 2 : 0,
            }}
            handleChange={code => setCode(code)}
            numberOfInputs={6}
          />
        </View>

        <View style={styles.bottomView}>
          <Text language={language} style={styles.text2}>
            {showResend ? 'Didn’t receive the code? ' : 'Resend OTP: '}

            <Text
              language={language}
              onPress={() => {
                {
                  showResend ? resend() : null;
                }
              }}
              style={[
                styles.text3,
                {textDecorationLine: showResend ? 'underline' : 'none'},
              ]}>
              {showResend ? 'Resend' : remainingTime}
            </Text>
          </Text>
          <Button
            onPress={() => {
              checkOtp();
            }}
            buttonText={'Verify Code'}
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
        cancelText="Ok"
        cancelButtonColor={colors.error}
        cancelButtonStyle={{width: 60, alignItems: 'center'}}
        onCancelPressed={() => {
          setShowError(false);
        }}
        onDismiss={() => {
          setShowError(false);
        }}
      />
      <AwesomeAlert
        show={showSuccess}
        showProgress={false}
        title=""
        titleStyle={{color: colors.success}}
        message={'Otp sent successfully to ' + route.params.number}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Ok"
        cancelButtonColor={colors.success}
        cancelButtonStyle={{width: 60, alignItems: 'center'}}
        onCancelPressed={() => {
          setShowSuccess(false);
        }}
        onDismiss={() => {
          setShowSuccess(false);
        }}
      />
    </SafeAreaView>
  );
};

export default ForgetPasswordOtpScreen;
