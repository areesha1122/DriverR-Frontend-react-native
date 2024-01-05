import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  Text as Text1,
  View,
} from 'react-native';
import {styles} from './styles';
import Text from 'src/components/text';
import {Images} from 'src/assets';
import {fontRef, fullWidth, heightRef, widthRef} from 'src/config/screenSize';
import {fontWeights} from 'src/config/fontWeight';
import Button, {Alignments} from 'src/components/button';
import {colors} from 'src/config/colors';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import PhoneInput from 'react-native-phone-number-input';
import InputFeild from 'src/components/inputFeild';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from 'src/redux/auth/authApiCalls';
import {TextInput} from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';
import {getPhoneNumber} from 'react-native-device-info';
import {getLanguage} from 'src/redux/auth/authSelector';
const ChangePasswordScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const route: any = useRoute();

  // States
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  // Selectors
  const language = useSelector(getLanguage);

  // Effects

  // Functions
  const resetPasswordd = () => {
    setLoader(true);
    dispatch(
      resetPassword(
        {
          phoneNumber: route.params.number,
          newPassword: password,
          confirmNewPassword: confirmPassword,
        },
        (success, msg) => {
          if (success) {
            console.log('41: Success');
            setShowSuccess(true);
            setLoader(false);
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

  const checkPasswords = () => {
    let reg = /^(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{8,20}$/;
    password == ''
      ? setPasswordError('Enter valid password')
      : !reg.test(password)
      ? setPasswordError(
          'Password should be between 8 to 20 characters with atleast one capital letter and a special character',
        )
      : password != confirmPassword
      ? setConfirmPasswordError(
          'Confirm password does not match to your password',
        )
      : resetPasswordd();
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
          Reset your password
        </Text>
        <View
          style={{
            width: 0.94 * fullWidth,
            marginLeft: '3%',
            marginTop: 30 * heightRef,
          }}>
          <View>
            <Icon
              onPress={() => setShowPassword(!showPassword)}
              type={IconType.Entypo}
              name={!showPassword ? 'eye' : 'eye-with-line'}
              size={18 * heightRef}
              color={colors.black}
              style={{
                position: 'absolute',
                zIndex: 100,
                right: 20 * widthRef,
                top: 25 * heightRef,
              }}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={text => {
                setPassword(text);
                setPasswordError('');
              }}
              mode="outlined"
              style={{height: 54 * heightRef}}
              activeOutlineColor={passwordError ? colors.error : colors.primary}
              outlineColor={passwordError ? colors.error : colors.darkGray}
              outlineStyle={{borderWidth: 2}}
              secureTextEntry={showPassword}
              scrollEnabled={false}
              selectionColor={colors.secondary1}
              cursorColor={colors.secondary1}
            />
            <Text
              language={language}
              style={{marginVertical: 4 * heightRef, color: colors.error}}>
              {passwordError}
            </Text>
          </View>
          <View>
            <Icon
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              type={IconType.Entypo}
              name={!showConfirmPassword ? 'eye' : 'eye-with-line'}
              size={18 * heightRef}
              color={colors.black}
              style={{
                position: 'absolute',
                zIndex: 100,
                right: 20 * widthRef,
                top: 25 * heightRef,
              }}
            />
            <TextInput
              label="Confirm password"
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                setConfirmPasswordError('');
              }}
              mode="outlined"
              style={{height: 54 * heightRef}}
              activeOutlineColor={
                confirmPasswordError ? colors.error : colors.primary
              }
              outlineColor={
                confirmPasswordError ? colors.error : colors.darkGray
              }
              outlineStyle={{borderWidth: 2}}
              secureTextEntry={showConfirmPassword}
              scrollEnabled={false}
              selectionColor={colors.secondary1}
              cursorColor={colors.secondary1}
            />
            <Text
              language={language}
              style={{marginVertical: 4 * heightRef, color: colors.error}}>
              {confirmPasswordError}
            </Text>
          </View>
        </View>

        <View style={styles.bottomView}>
          <Button
            onPress={() => {
              checkPasswords();
            }}
            buttonText={'Save Password'}
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
        message={'Password reset successfully'}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        alertContainerStyle={{borderRaduis: 50}}
        contentContainerStyle={{borderRaduis: 50}}
        showConfirmButton={false}
        cancelText="Ok"
        cancelButtonColor={colors.success}
        cancelButtonStyle={{width: 60, alignItems: 'center'}}
        onCancelPressed={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'GetStartedScreen',
                  params: {},
                },
              ],
            }),
          );
        }}
        onDismiss={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'GetStartedScreen',
                  params: {},
                },
              ],
            }),
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
