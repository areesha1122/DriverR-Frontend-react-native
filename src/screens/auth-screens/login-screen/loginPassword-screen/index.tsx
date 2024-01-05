import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Image, Platform, SafeAreaView, View} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {loginDriver} from 'src/redux/auth/authApiCalls';
import AwesomeAlert from 'react-native-awesome-alerts';
import {getLanguage} from 'src/redux/auth/authSelector';
import {Keyboard} from 'react-native';

const LoginPasswordScreen = (props: any) => {
  // Variables
  const phoneInput: any = useRef<PhoneInput>(null);
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const route = useRoute<any>();

  // States
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  // Selectors
  const language = useSelector(getLanguage);
  console.log('Phone No ====>>>>', route.params.number);

  // Effects

  // Functions
  const login = () => {
    setLoader(true);
    dispatch(
      loginDriver(
        {
          phoneNumber: route.params.number,
          password: password,
        },
        (success, msg) => {
          if (success) {
            console.log('41: Success');
            setLoader(false);
          } else {
            console.log('43: Fail', {
              phoneNumber: route.params.number,
              password: password,
            });
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
  const checkPassword = () => {
    password.length < 8
      ? setPasswordError('Please enter your valid eight character password')
      : login();
  };

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
          buttonHeight={32 * heightRef}
          buttonWidth={32 * heightRef}
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
          Login into your account
        </Text>
        <View
          style={{
            width: 0.94 * fullWidth,
            marginLeft: '3%',
            marginTop: 0 * heightRef,
          }}>
          <View>
            <Text
              style={[
                styles.text1,
                {color: passwordError ? colors.error : colors.primary},
              ]}>
              Password
            </Text>
            <InputFeild
              autoFocus={true}
              onChangeText={text => {
                setPassword(text);
                setPasswordError('');
              }}
              value={password}
              borderRadius={5}
              password
              borderColor={colors.primary}
              message={passwordError}
              placeholder="Enter password"
            />
          </View>
        </View>

        <View style={styles.bottomView}>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text language={language} style={styles.text2}>
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
              checkPassword();
            }}
            buttonText={'Login'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={colors.primary}
            iconSize={25}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{}}
            isLoading={loader}
          />
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
      </View>
    </SafeAreaView>
  );
};

export default LoginPasswordScreen;
